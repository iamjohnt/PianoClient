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
import ChordObservable from "../keyboard_connection/ChordObservable";


export default class GameContext implements ChordSequenceHandler, ChordObservable {

    // general fields
    public stompService: StompService;
    public keyboardConnection: KeyboardConnection;
    public settings: GameSettings;
    public keyboardType: KeyboardType;

    // gameplay specific fields
    public converter: MidiToSheetNote;
    public lessonChordQ: Queue<SheetChord>;
    public handleChordSequence: (startGameResponse: StartGameResponse) => void;
    public handleChordResponse: (chordResponse: ChordResponse) => void;
    public handleNoteFromKeyboard: () => void;

    // flags
    public isReadyForChordInput = true;

    constructor() {

    }

    public connectGameToServer = () => {
        // keyboard chords has stomp observer - (on observe, sends chord)
        this.keyboardConnection.addChordObserver(this);

        // subscribe for game start
        this.stompService.stompIn.subscribeStartGameResponse((chordSeq: StartGameResponse) => {
            this.handleChordSequence(chordSeq);
        })

        // subscribe for chords response
        this.stompService.stompIn.subscribeChordResponse((chordResponse: ChordResponse) => {
            this.handleChordResponse(chordResponse);
        });
    }
    
    public onKeyboardChord = (chord: Set<number>): void => {
        if (this.isReadyForChordInput) {
            this.isReadyForChordInput = false;
            this.stompService.stompOut.sendChord(chord)
        } else {
            console.log('currently already sending or animating, so cannot send chord')
        }
    }
    


}