import { WhichHands } from "../../game/Enum";
import MidiMessage from "../../keyboard_connection/MidiMessage";
import { NoteOnOff } from "../../music_model/Enums";
import SheetNote from "../../music_model/SheetNote";
import GameContext from "./GameContext";
import { GameObjects } from "phaser";
import PlayerChordsManager from "./PlayerChordsManager";

export default class Game extends Phaser.Scene{

    private context: GameContext;
    private possiblePlayerSprites: Map<number, GameObjects.Sprite>;
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
    };

    public update = () => {
        if (!this.context.noteEventQ.isEmpty()) {

            let noteEvent: SheetNote = this.context.noteEventQ.dequeue();
            this.playerChordsManager.handleNoteOnOrOff(noteEvent);
        };
    }

    private populatePlayerNoteSprites = (): Map<number, GameObjects.Sprite> => {

        let sprites: Map<number, GameObjects.Sprite> = new Map<number, GameObjects.Sprite>();

        let staffCenterPos = 700;
        let intervalDist = 50;
        let noteCount = 17;
        let key = -8; // center of 17 is 9. zero out the 9, and you get range of -8 to +8

        for (let i = key; i < 8; i++) {
            let y = staffCenterPos - (i * intervalDist);
            let curSprite: GameObjects.Sprite = this.add.sprite(600, y, 'note').setVisible(false)
            sprites.set(i, curSprite)
        }

        return sprites;
    } 

}