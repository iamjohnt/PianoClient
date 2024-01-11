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
import ChordResponse from "../../../stomp_connection/response_objects/ChordResponse";
import LessonChordsManager from "./LessonChordsManager";

export default class PlayScene extends Phaser.Scene{

    public context: GameContext;
    private playerChordsManager: PlayerChordsManager;
    private lessonChordsManager: LessonChordsManager;

    constructor() {
        super({ key: 'game' });
    }

    public init = (context: GameContext) => {
        this.context = context;
        this.lessonChordsManager = new LessonChordsManager(this);
        this.context.handleChordSequence = this.lessonChordsManager.spawnLessonChords;
        this.context.connectGameToServer();
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

    // private moveAllChordsLeft = () => {
    //     let tween = this.tweens.add({
    //         targets: this.c_chordSequence,
    //         x: this.c_chordSequence.x - ObjectPositions.GAP_TWEEN_LESSON_CHORDS(),
    //         duration: 100,
    //         ease: 'Linear'
    //     });    
    // }


}