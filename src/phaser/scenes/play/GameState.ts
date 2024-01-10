import Queue from "../../../data_structure/Queue";
import { GameSettings } from "../../../game/GameSettings";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import MidiObservable from "../../../keyboard_connection/MidiObservable";
import MidiToSheetNote from "../../../music_model/MidiToSheetNote";
import SheetChord from "../../../music_model/SheetChord";
import SheetNote from "../../../music_model/SheetNote";
import ChordSequenceHandler from "../../../stomp_connection/ChordSequenceHandler";
import StompService from "../../../stomp_connection/StompService";
import StartGameResponse from "../../../stomp_connection/response_objects/StartGameResponse";

export default class GameState implements MidiObservable, ChordSequenceHandler{
    
    public noteEventQ: Queue<SheetNote>;
    public lessonChordQ: Queue<SheetChord>;
    public converter: MidiToSheetNote;
    public stompService: StompService;

    constructor(stompService: StompService) {
        this.noteEventQ = new Queue<SheetNote>(200);
        this.stompService = stompService;
    }

    public setSettings = (settings: GameSettings) => {
        this.converter = new MidiToSheetNote(
            settings.getKeySigNote(), 
            settings.getKeySigMode(), 
            settings.getWhichHands()
        );
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
    
}