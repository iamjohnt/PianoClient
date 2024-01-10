import { GameSettings } from "../game/GameSettings";
import KeyboardConnection from "../keyboard_connection/KeyboardConnection";
import StompService from "../stomp_connection/StompService";
import { KeyboardType } from "../game/Enum";
import MidiToSheetNote from "../music_model/MidiToSheetNote";
import SheetNote from "../music_model/SheetNote";
import Queue from "../data_structure/Queue";
import SheetChord from "../music_model/SheetChord";
import MidiMessage from "../keyboard_connection/MidiMessage";
import StartGameResponse from "../stomp_connection/response_objects/StartGameResponse";
import MidiObservable from "../keyboard_connection/MidiObservable";
import ChordSequenceHandler from "../stomp_connection/ChordSequenceHandler";
import CreateSessionResponse from "../stomp_connection/response_objects/CreateSessionResponse";
import ChordResponse from "../stomp_connection/response_objects/ChordResponse";


export default class GameContext implements MidiObservable, ChordSequenceHandler {

    // general fields
    public stompService: StompService;
    public keyboardConnection: KeyboardConnection;
    public settings: GameSettings;
    public keyboardType: KeyboardType;

    // gameplay specific fields
    public converter: MidiToSheetNote;
    public noteEventQ: Queue<SheetNote> = new Queue<SheetNote>(200);
    public lessonChordQ: Queue<SheetChord>;


    constructor() {

    }

    public onUpdate = (midiMessage: MidiMessage): void => {
        let sheetNote: SheetNote = this.converter.getSheetNote(midiMessage);
        this.noteEventQ.enqueue(sheetNote);
    }


    public handleChordSequence = (startGameResponse: StartGameResponse) => {

        // init lesson
        let lessonLength = startGameResponse.chordSequence.length;
        this.lessonChordQ = new Queue<SheetChord>(lessonLength);

        // convert every chord to SheetChord, and add it to lesson
        startGameResponse.chordSequence.forEach(chordObj => {
            let sheetChord: SheetChord = new SheetChord();
            chordObj.chord.forEach(note => {
                let midiNote: MidiMessage = new MidiMessage(144, note, 100);
                let sheetNote: SheetNote = this.converter.getSheetNote(midiNote);
                sheetChord.addNote(sheetNote);
            });
            this.lessonChordQ.enqueue(sheetChord);
        })
        console.log(this.lessonChordQ)
    }


    public connectGameToServer = () => {
        // keyboard chords has stomp observer - (on observe, sends chord)
        this.keyboardConnection?.addChordObserver(this.stompService);

        // subscribe for game start
        this.stompService?.stompIn.subscribeStartGameResponse((chordSeq: StartGameResponse) => {
            this.handleChordSequence(chordSeq);
        })

        // subscribe for chords response
        this.stompService?.stompIn.subscribeChordResponse((chordResponse: ChordResponse) => {
            console.log(chordResponse);
        });
    }
    


}