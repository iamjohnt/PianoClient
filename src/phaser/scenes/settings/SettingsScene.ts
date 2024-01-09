import { ChordPool, KeySigMode, KeyboardType, WhichHands } from "../../../game/Enum";
import { GameSettings } from "../../../game/GameSettings";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import { KeySigNote } from "../../../music_model/Enums";
import SettingsResponse from "../../../stomp_connection/response_objects/SettingsResponse";
import GameContext from "../../GameContext";
import ObjectPositions from "../../ObjectPositions";
import GameState from "../play/GameState";

export default class SettingsScene extends Phaser.Scene{

    private context: GameContext;
    private settings: GameSettings;

    constructor() {
        super({ key: 'settings' });
        this.settings = new GameSettings()
            .setKeySigNote(KeySigNote.C)
            .setKeySigMode(KeySigMode.MAJOR)
            .setLeftMin(36) // c2
            .setLeftMax(64) // e4
            .setRightMin(57) // a4
            .setRightMax(84) // c6
            .setLength(30)
    }

    public init = (context: GameContext) => {
        console.log('settings scene init')
        console.log(this.context)
        this.context = context;
        this.context.gameState = new GameState();
    }

    public preload = () => {

    };
    
    public create = () => {

        const level_1 = this.createButton(0, 100, 'Level 1 - NOTE', () => {this.settings.setChordPool(ChordPool.NOTE)});
        const level_2 = this.createButton(0, 200, 'Level 2 - INTERVAL', () => {this.settings.setChordPool(ChordPool.INTERVAL)});
        const level_3 = this.createButton(0, 300, 'Level 3 - TRIAD', () => {this.settings.setChordPool(ChordPool.TRIAD)});
        const level_4 = this.createButton(0, 400, 'Level 4 - TETRAD', () => {this.settings.setChordPool(ChordPool.TETRAD)});
        const level_5 = this.createButton(0, 500, 'Level 5 - NOTE_INTERVAL', () => {this.settings.setChordPool(ChordPool.NOTE_INTERVAL)});
        const level_6 = this.createButton(0, 600, 'Level 6 - NOTE_INTERVAL_TRIAD', () => {this.settings.setChordPool(ChordPool.NOTE_INTERVAL_TRIAD)});
        const level_7 = this.createButton(0, 700, 'Level 7 - NOTE_INTERVAL_TRIAD_TETRAD', () => {this.settings.setChordPool(ChordPool.NOTE_INTERVAL_TRIAD_TETRAD)});

        const left_hand = this.createButton(0, 800, 'Left Hand', () => this.settings.setWhichHands(WhichHands.LEFT))
        const right_hand = this.createButton(0, 900, 'Right Hand', () => this.settings.setWhichHands(WhichHands.RIGHT))

        const visual_keyboard = this.createButton(1200, 200, 'Visual Keyboard', () => {
            this.context.keyboardType = KeyboardType.VIRTUAL
        })
        
        const connected_keyboard = this.createButton(1200, 600, 'Connected Keyboard', () => {
            this.context.keyboardType = KeyboardType.CONNECTED;
            let keyboard = new KeyboardConnection();
            keyboard.setOnConnectMidiSuccess(() => {
                if (this.context.gameState != null) {
                    this.context.gameState.setSettings(this.settings)
                    keyboard.addNoteObserver(this.context.gameState)
                }
            })
            this.context.keyboardConnection = keyboard;
            keyboard.connectMidi();
        })

        const submit = this.createButton(0, 1000, 'Submit Settings', () => {
            this.sendSettingsToServerGoNextScene();
        })
    };

    public update = () => {

    }

    private createButton = (x: number, y: number, text: string, callback: Function): Phaser.GameObjects.Text => {
        return this.add.text(x, y, text)
            .setFontSize(72)
            .setColor('black')
            .setInteractive()
            .on('pointerdown', callback)
    }
    
    private sendSettingsToServerGoNextScene = () => {
        console.log(this.settings)
        this.context.settings = this.settings;

        this.context.stompService?.stompIn.subscribeSettingsResponse((settings: SettingsResponse) => {
            console.log(settings)
            this.scene.start('game', this.context)
        })
        this.context.stompService?.stompOut.sendGameSettings(this.settings);
    }


}