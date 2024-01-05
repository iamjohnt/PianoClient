import { WhichHands } from "../../../game/Enum";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import SheetNote from "../../../music_model/SheetNote";
import StompService from "../../../stomp_connection/StompService";
import GameContext from "../../GameContext";
import GameState from "./GameState";
import PlayerChordsManager from "./PlayerChordsManager";
import TestContainer from "./TestContainer"

export default class PlayScene extends Phaser.Scene{

    private context: GameContext;
    private stomp: StompService;
    private keyboard: KeyboardConnection; 
    private state: GameState;
    private playerChordsManager: PlayerChordsManager;

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

}