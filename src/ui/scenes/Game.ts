import { WhichHands } from "../../game/Enum";
import SheetNote from "../../music_model/SheetNote";
import GameContext from "./GameContext";
import PlayerChordsManager from "./PlayerChordsManager";
import TestContainer from "../containers/TestContainer"

export default class Game extends Phaser.Scene{

    private context: GameContext;
    private playerChordsManager: PlayerChordsManager;

    constructor() {
        super({ key: 'Game' });
    }

    public init = (context: GameContext) => {
        this.context = context;
    }

    public preload = () => {
        this.load.image('staff', 'assets/staff.png')
        this.load.image('note', 'assets/note.png')
        this.load.image('line', 'assets/line.png')


        if (this.context.settings.getWhichHands() == WhichHands.LEFT) {
            this.load.image('clef', 'assets/bass.png')
        } else {
            this.load.image('clef', 'assets/treble.png')
        }
    };
    
    public create = () => {
        this.add.image(0, 0, 'staff').setOrigin(0,0);
        this.add.image(0, 0, 'clef').setOrigin(0,0);
        this.playerChordsManager = new PlayerChordsManager(this);
        let gameTester: TestContainer = new TestContainer(this, 0, 0);
    };

    public update = () => {
        if (!this.context.noteEventQ.isEmpty()) {
            let noteEvent: SheetNote = this.context.noteEventQ.dequeue();
            this.playerChordsManager.handleNoteOnOrOff(noteEvent);
        };
    }

}