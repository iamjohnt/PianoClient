import { WhichHands } from "../../../game/Enum";
import SheetNote from "../../../music_model/SheetNote";
import PlaySceneContext from "./PlaySceneContext";
import PlayerChordsManager from "./PlayerChordsManager";
import TestContainer from "./TestContainer"

export default class PlayScene extends Phaser.Scene{

    private context: PlaySceneContext;
    private playerChordsManager: PlayerChordsManager;

    constructor() {
        super({ key: 'game' });
    }

    public init = (context: PlaySceneContext) => {
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