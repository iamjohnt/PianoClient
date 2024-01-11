import { GameSettings } from "../game/GameSettings";
import KeyboardConnection from "../keyboard_connection/KeyboardConnection";
import StompService from "../stomp_connection/StompService";
import { KeyboardType } from "../game/Enum";
import MidiToSheetNote from "../music_model/MidiToSheetNote";
import Queue from "../data_structure/Queue";
import SheetChord from "../music_model/SheetChord";
import StartGameResponse from "../stomp_connection/response_objects/StartGameResponse";
import ChordSequenceHandler from "../stomp_connection/ChordSequenceHandler";
import ChordResponse from "../stomp_connection/response_objects/ChordResponse";


export default class GameContext implements ChordSequenceHandler {

    // general fields
    public stompService: StompService;
    public keyboardConnection: KeyboardConnection;
    public settings: GameSettings;
    public keyboardType: KeyboardType;

    // gameplay specific fields
    public converter: MidiToSheetNote;
    public lessonChordQ: Queue<SheetChord>;
    public handleChordSequence: (startGameResponse: StartGameResponse) => void;
    public handleNoteFromKeyboard: () => void;

    constructor() {

    }

    public connectGameToServer = () => {
        // keyboard chords has stomp observer - (on observe, sends chord)
        this.keyboardConnection.addChordObserver(this.stompService);

        // subscribe for game start
        this.stompService.stompIn.subscribeStartGameResponse((chordSeq: StartGameResponse) => {
            this.handleChordSequence(chordSeq);
        })

        // subscribe for chords response
        this.stompService.stompIn.subscribeChordResponse((chordResponse: ChordResponse) => {
            console.log(chordResponse);
        });
    }
    


}