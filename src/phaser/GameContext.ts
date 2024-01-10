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
    public handleChordSequence: (startGameResponse: StartGameResponse) => void;

    constructor() {

    }

    public onUpdate = (midiMessage: MidiMessage): void => {
        let sheetNote: SheetNote = this.converter.getSheetNote(midiMessage);
        this.noteEventQ.enqueue(sheetNote);
    }

    public connectGameToServer = () => {

        // stomp service observes for chords - upon chord, sends it
        this.keyboardConnection.addChordObserver(this.stompService);

        // subscribe for and handle chord and start game responses
        this.stompService.stompIn.subscribeStartGameResponse((chordSeq: StartGameResponse) => {
            this.handleChordSequence(chordSeq);
        })
        
        this.stompService.stompIn.subscribeChordResponse((chordResponse: ChordResponse) => {
            console.log(chordResponse);
        });
    }
    


}