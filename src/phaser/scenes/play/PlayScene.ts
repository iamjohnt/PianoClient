import { WhichHands } from "../../../music_model/Enums";
import GameContext from "../../GameContext";
import C_PlayerNotePool from "./C_PlayerNotePool";
import LessonChordsContainer from "./C_LessonChordSequence";
import ObjectPositions from "../../ObjectPositions";
import C_LessonChordSequence from "./C_LessonChordSequence";
import C_MusicSheet from "./C_MusicSheet";

export default class PlayScene extends Phaser.Scene{

    public context: GameContext;
    private playerChordsManager: C_PlayerNotePool;
    private lessonChordsManager: LessonChordsContainer;

    constructor() {
        super({ key: 'game' });
    }

    public init = (context: GameContext) => {
        this.context = context;
    }

    public preload = () => {

        let base = 'assets/game/'
        this.load.image('staff', base + 'staff2.png')
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



        if (this.context.settings?.getWhichHands() == WhichHands.LEFT) {
            this.load.image('clef', base + 'bass2.png')
        } else {
            this.load.image('clef', base + 'treble2.png')
        }
        this.load.image('back', 'assets/global/back.png')
    };
    
    public create = () => {

        this.add.image(0, 0, 'white_background').setOrigin(0, 0).setDepth(-1)

        // create managers
        this.lessonChordsManager = new C_LessonChordSequence(this, ObjectPositions.PLAYER_NOTE_LEFT_X() , 0, this.context);
        this.playerChordsManager = new C_PlayerNotePool(this, ObjectPositions.PLAYER_NOTE_LEFT_X(), 0, this.context);
        let musicSheet = new C_MusicSheet(this, ObjectPositions.WIDTH() / 10, ObjectPositions.HEIGHT() / 2, this.context.settings.getWhichHands())
            .setScale(.7, .7);
        musicSheet.add(this.lessonChordsManager)
        musicSheet.add(this.playerChordsManager)

        this.add.image(ObjectPositions.WIDTH(), ObjectPositions.HEIGHT() / 2, 'spawner').setOrigin(1, .5)

        // attach
        this.context.keyboardConnection.addNoteObserver(this.playerChordsManager);
        this.context.handleChordSequence = this.lessonChordsManager.spawnLessonChords;
        this.context.handleChordResponse = this.lessonChordsManager.handleChordResponse;

        // connect to server
        this.context.connectGameToServer();

        // start the game
        this.context.stompService.stompOut.startGame("dummytext");

        this.createBackButton();
    };

    public update = () => {

    }

    private createBackButton = () => {
        // adds back button
        this.add.image(200, 150, 'back')
        .setOrigin(.5, .5)
        .setScale(1.5)
        .setDepth(4)
        .setInteractive()
        .on('pointerdown', () => { 
            this.context.stompService.stompClient.onDisconnect = () => {
                this.scene.start('welcome', new GameContext());
            }
            this.context.stompService.stompClient.deactivate();
        })
    }
}