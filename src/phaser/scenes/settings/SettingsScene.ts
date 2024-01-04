import { ChordPool, KeySigMode, WhichHands } from "../../../game/Enum";
import { GameSettings } from "../../../game/GameSettings";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import { KeySigNote } from "../../../music_model/Enums";
import PlaySceneContext from "../play/PlaySceneContext";
import ObjectPositions from "../../ObjectPositions";

export default class SettingsScene extends Phaser.Scene{


    private pos: ObjectPositions;
    private settings: GameSettings;
    private keyboard: KeyboardConnection;

    constructor() {
        super({ key: 'settings' });
        this.pos = new ObjectPositions();

        this.settings = new GameSettings()
            .setKeySigNote(KeySigNote.C)
            .setKeySigMode(KeySigMode.MAJOR)
            .setLeftMin(30)
            .setLeftMax(48)
            .setRightMin(50)
            .setRightMax(72)
            .setLength(30)
        
    }

    // public init = () => {}

    public preload = () => {

    };
    
    public create = () => {

        this.keyboard = this.registry.get('keyboard');
        this.keyboard.setOnConnectMidiFailure(() => console.log('no midi'))
        this.keyboard.setOnConnectMidiSuccess(() => console.log('yay midi!'))

        const connect_midi = this.createButton(1000, 500, 'connect midi').on('pointerdown', () => {
            this.keyboard.connectMidi();
        })

        const level_1 = this.createLevelButton(0, 100, 'Level 1 - NOTE', ChordPool.NOTE)
        const level_2 = this.createLevelButton(0, 200, 'Level 1 - INTERVAL', ChordPool.INTERVAL)
        const level_3 = this.createLevelButton(0, 300, 'Level 1 - TRIAD', ChordPool.TRIAD)
        const level_4 = this.createLevelButton(0, 400, 'Level 1 - TETRAD', ChordPool.TETRAD)
        const level_5 = this.createLevelButton(0, 500, 'Level 1 - NOTE_INTERVAL', ChordPool.NOTE_INTERVAL)
        const level_6 = this.createLevelButton(0, 600, 'Level 1 - NOTE_INTERVAL_TRIAD', ChordPool.NOTE_INTERVAL_TRIAD)
        const level_7 = this.createLevelButton(0, 700, 'Level 1 - NOTE_INTERVAL_TRIAD_TETRAD', ChordPool.NOTE_INTERVAL_TRIAD_TETRAD)

        const left_hand = this.createHandButton(0, 800, 'Left Hand', WhichHands.LEFT)
        const right_hand = this.createHandButton(0, 900, 'Right Hand', WhichHands.RIGHT)

        const submit = this.createButton(0, 1000, 'Submit Settings').on('pointerdown', () => {
            let gameSceneContext = new PlaySceneContext(this.settings)
            this.keyboard.addNoteObserver(gameSceneContext) 
            this.scene.start('game', gameSceneContext)
        })


    };

    public update = () => {

    }


    private createLevelButton = (x: number, y: number, text: string, chordPool: ChordPool): Phaser.GameObjects.Text => {
        return this.add.text(x, y, text)
            .setFontSize(72)
            .setColor('black')
            .setInteractive()
            .on('pointerdown', () => {this.settings.setChordPool(chordPool); console.log(this.settings)});
    }

    private createHandButton = (x: number, y: number, text: string, hand: WhichHands): Phaser.GameObjects.Text => {
        return this.add.text(x, y, text)
            .setFontSize(72)
            .setColor('black')
            .setInteractive()
            .on('pointerdown', () => {this.settings.setWhichHands(hand); console.log(this.settings)});
    }

    private createButton = (x: number, y: number, text: string): Phaser.GameObjects.Text => {
        return this.add.text(x, y, text)
            .setFontSize(72)
            .setColor('black')
            .setInteractive()
        }

}