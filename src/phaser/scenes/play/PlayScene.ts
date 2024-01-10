import { GameObjects } from "phaser";
import Queue from "../../../data_structure/Queue";
import { WhichHands } from "../../../game/Enum";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import SheetChord from "../../../music_model/SheetChord";
import SheetNote from "../../../music_model/SheetNote";
import StartGameResponse from "../../../stomp_connection/response_objects/StartGameResponse";
import GameContext from "../../GameContext";
import ObjectPositions from "../../ObjectPositions";
import C_LessonChord from "./C_LessonChord";
import PlayerChordsManager from "./PlayerChordsManager";

export default class PlayScene extends Phaser.Scene{

    private context: GameContext;
    private playerChordsManager: PlayerChordsManager;
    private c_chordSequence: GameObjects.Container;

    constructor() {
        super({ key: 'game' });
    }

    public init = (context: GameContext) => {
        this.context = context;
        this.context.handleChordSequence = this.handleChordSequenceResponse;
        this.context.connectGameToServer()
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

        this.context.stompService.stompOut.startGame("dummytext");
    };

    public update = () => {
        if (!this.context.noteEventQ.isEmpty()) {
            let noteEvent: SheetNote;
            noteEvent = this.context.noteEventQ.dequeue();
            this.playerChordsManager.handleNoteOnOrOff(noteEvent);
        };
    }

    private handleChordSequenceResponse = (startGameResponse: StartGameResponse) => {

        this.c_chordSequence = this.add.container(800, 0)
        
        // init lesson
        let len = startGameResponse.chordSequence.length;
        let q = new Queue<SheetChord>(len);
        let chordX = 0;

        // for every chord
        startGameResponse.chordSequence.forEach(chordObj => {

            // build a sheet chord
            let sheetChord: SheetChord = new SheetChord();
            chordObj.chord.forEach(note => {
                let midiNote: MidiMessage = new MidiMessage(144, note, 100);
                let sheetNote: SheetNote = this.context.converter.getSheetNote(midiNote);
                sheetChord.addNote(sheetNote);
            });

            // create lesson container / sprite from sheetchord
            this.c_chordSequence.add(new C_LessonChord(this, chordX, 0, sheetChord))
            q.enqueue(sheetChord);
            chordX += ObjectPositions.GAP_TWEEN_LESSON_CHORDS();
        })
        
        // set q state
        this.context.lessonChordQ = q;

    }

}