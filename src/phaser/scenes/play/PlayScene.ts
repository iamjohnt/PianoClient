import { WhichHands } from "../../../game/Enum";
import GameContext from "../../GameContext";
import PlayerChordsManager from "./PlayerChordsManager";
import LessonChordsManager from "./LessonChordsManager";
import ObjectPositions from "../../ObjectPositions";

export default class PlayScene extends Phaser.Scene{

    public context: GameContext;
    private playerChordsManager: PlayerChordsManager;
    private lessonChordsManager: LessonChordsManager;

    constructor() {
        super({ key: 'game' });
    }

    public init = (context: GameContext) => {
        this.context = context;
    }

    public preload = () => {

        let base = 'assets/game/'
        this.load.image('staff', base + 'staff.png')
        this.load.spritesheet('note_sprite', base + 'note_sprite.png', {
            frameWidth: 100,
            frameHeight: 100
        })
        this.load.spritesheet('speed_sprite', base + 'speed_sprite.png', {
            frameWidth: 1300,
            frameHeight: 600
        })

        this.load.image('blue_note', base + 'blue_note.png')
        this.load.image('ledger', base + 'ledger.png')
        this.load.image('cursor', base + 'cursor.png')
        this.load.image('spawner', base + 'spawner.png')
        this.load.image('white_background', base + 'white_background.png')
        this.load.image('green_highlight', base + 'green_highlight.png')



        if (this.context.settings?.getWhichHands() == WhichHands.LEFT) {
            this.load.image('clef', base + 'bass.png')
        } else {
            this.load.image('clef', base + 'treble.png')
        }
    };
    
    public create = () => {

        this.add.image(0, 0, 'white_background').setOrigin(0, 0).setDepth(-1)
        this.add.image(0, 0, 'staff').setOrigin(0,0)
        this.add.image(0, 0, 'clef').setOrigin(0,0)
        this.add.image(0, 0, 'green_highlight').setOrigin(0, 0).setDepth(-1)


        // create managers
        this.lessonChordsManager = new LessonChordsManager(this);
        this.playerChordsManager = new PlayerChordsManager(this);

        this.add.image(ObjectPositions.WIDTH(), ObjectPositions.HEIGHT() / 2, 'spawner').setOrigin(1, .5)

        // attach
        this.context.keyboardConnection.addNoteObserver(this.playerChordsManager);
        this.context.handleChordSequence = this.lessonChordsManager.spawnLessonChords;
        this.context.handleChordResponse = this.lessonChordsManager.handleChordResponse;

        // connect to server
        this.context.connectGameToServer();

        // start the game
        this.context.stompService.stompOut.startGame("dummytext");

    };

    public update = () => {

    }
}