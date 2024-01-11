import { WhichHands } from "../../../game/Enum";
import SheetNote from "../../../music_model/SheetNote";
import GameContext from "../../GameContext";
import PlayerChordsManager from "./PlayerChordsManager";
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

}