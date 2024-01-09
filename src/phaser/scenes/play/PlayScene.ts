import Queue from "../../../data_structure/Queue";
import { WhichHands } from "../../../game/Enum";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import { Accidental, NoteOnOff } from "../../../music_model/Enums";
import SheetChord from "../../../music_model/SheetChord";
import SheetNote from "../../../music_model/SheetNote";
import StompService from "../../../stomp_connection/StompService";
import ChordResponse from "../../../stomp_connection/response_objects/ChordResponse";
import CreateSessionResponse from "../../../stomp_connection/response_objects/CreateSessionResponse";
import StartGameResponse from "../../../stomp_connection/response_objects/StartGameResponse";
import GameContext from "../../GameContext";
import C_LessonChord from "./C_LessonChord";
import C_LessonChordSequence from "./C_LessonChordSequence";
import GameState from "./GameState";
import PlayerChordsManager from "./PlayerChordsManager";

export default class PlayScene extends Phaser.Scene{

    private context: GameContext;
    private stomp: StompService;
    private keyboard: KeyboardConnection; 
    private state: GameState;
    private playerChordsManager: PlayerChordsManager;
    private c_chordSequence: C_LessonChordSequence;

    constructor() {
        super({ key: 'game' });
    }

    public init = (context: GameContext) => {
        this.context = context;

        if (context.stompService != null) {
            this.stomp = context.stompService;
        }
        if (context.keyboardConnection != null) {
            this.keyboard = context.keyboardConnection;
        }
        if (context.gameState != null) {
            this.state = context.gameState;
        }

        // keyboard chords has stomp observer - (on observe, sends chord)
        this.keyboard.addChordObserver(this.stomp);

        // subscribe start game response
        this.stomp.stompIn.subscribeCreateSessionResponse((createSessionResponse: CreateSessionResponse) => {
            console.log(createSessionResponse.message)
            this.stomp.stompOut.startGame("dummytext");
        })

        // subscribe for game start
        this.stomp.stompIn.subscribeStartGameResponse((chordSeq: StartGameResponse) => {
            this.handleChordSequenceResponse(chordSeq);
        })

        // subscribe for chords response
        this.stomp.stompIn.subscribeChordResponse((chordResponse: ChordResponse) => {
            console.log(chordResponse);
        });
        

    }

    public preload = () => {
        this.load.image('staff', 'assets/staff.png')
        this.load.image('note', 'assets/note.png')
        this.load.image('line', 'assets/line.png')


        if (this.context.settings?.getWhichHands() == WhichHands.LEFT) {
            this.load.image('clef', 'assets/bass.png')
        } else {
            this.load.image('clef', 'assets/treble.png')
        }
    };
    
    public create = () => {
        this.add.image(0, 0, 'staff').setOrigin(0,0);
        this.add.image(0, 0, 'clef').setOrigin(0,0);
        this.playerChordsManager = new PlayerChordsManager(this);

        this.stomp.stompOut.startGameSession("dummytext");
    };

    public update = () => {
        if (!this.context.gameState?.noteEventQ.isEmpty()) {
            let noteEvent: SheetNote;
            if (this.context.gameState != null) {
                noteEvent = this.context.gameState?.noteEventQ.dequeue();
                this.playerChordsManager.handleNoteOnOrOff(noteEvent);
            }
        };
    }

    private handleChordSequenceResponse = (startGameResponse: StartGameResponse) => {
        
        console.log(startGameResponse);
        // init lesson
        let len = startGameResponse.chordSequence.length;
        let q = new Queue<SheetChord>(len);

        // convert every chord to SheetChord, and add it to lesson
        startGameResponse.chordSequence.forEach(chordObj => {
            let sheetChord: SheetChord = new SheetChord();
            chordObj.chord.forEach(note => {
                let midiNote: MidiMessage = new MidiMessage(144, note, 100);
                let sheetNote: SheetNote = this.state.converter.getSheetNote(midiNote);
                sheetChord.addNote(sheetNote);
            });
            q.enqueue(sheetChord);
        })
        
        // set q state
        this.state.lessonChordQ = q;

        // spawn chord sequence
        this.c_chordSequence = new C_LessonChordSequence(this, 0, 0, q);
    }

}