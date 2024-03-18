import { GameSettings } from "../../../game/GameSettings";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import { ChordPool, KeySigMode, KeySigNote } from "../../../music_model/Enums";
import GameContext from "../../GameContext";
import ObjectPositions from "../../ObjectPositions";

export default class KeyboardModeScene extends Phaser.Scene{

    private noDetectedMidiDeviceErrorText: Phaser.GameObjects.Text;

    public context: GameContext;

    constructor() {
        super({ key: 'keyboardmode' });
    }

    public init = (context: GameContext) => {
        this.context = context;
    }

    public preload = () => {
        let base = 'assets/settings/keyboard_mode/'
        this.load.image('virtual', base + 'virtual.png')
        this.load.image('connected', base + 'connected.png')
        this.load.image('required', base + 'required_text.png')
    }

    public create = () => {

        // error message
        let errorMsgX = ObjectPositions.WIDTH() * (3/4) - 100
        let errorMsgY = ObjectPositions.HEIGHT() * (9.5/10)
        this.noDetectedMidiDeviceErrorText = this.add.text(errorMsgX, errorMsgY, 'error, no connected midi devices detected')
            .setColor('#ff0000')
            .setAlpha(0)
            .setFontFamily('Arial')
            .setFontSize(48)
            .setOrigin(.5, .5)

        // virtual keyboard button
        let virtualKeyboardButtonX = ObjectPositions.WIDTH() * (1/4) + 100
        let virtualKeyboardButtonY = ObjectPositions.HEIGHT() * (1.25/3)
        let virtual_button = this.add.image(virtualKeyboardButtonX, virtualKeyboardButtonY, 'virtual')
            .setOrigin(.5, .5)
            .setScale(.70)
            .setInteractive()
            .on('pointerdown', this.onVirtualKeyboardButtonClick)
        
        // connected keyboard button
        let connectedKeyboardButtonX = ObjectPositions.WIDTH() * (3/4) - 100
        let connectedKeyboardButtonY = ObjectPositions.HEIGHT() * (1.25/3)
        let connected_button = this.add.image(connectedKeyboardButtonX, connectedKeyboardButtonY, 'connected')
            .setOrigin(.5, .5)
            .setScale(.70)
            .setInteractive()
            .on('pointerdown', this.onConnectedKeyboardButtonClick)

        // connected keyboard instructions / info
        let infoMsgX = ObjectPositions.WIDTH() * (3/4) - 100
        let infoMsgY = ObjectPositions.HEIGHT() * (3.25/4)
        let required_text = this.add.image(infoMsgX, infoMsgY, 'required')
            .setOrigin(.5, .5)
            .setScale(.9)
    }

    private onConnectedKeyboardButtonClick = () => {
        // connect to the keyboard
        this.context.isVirtualKeyboard = false;

        let keyboard = new KeyboardConnection()
        keyboard.setOnConnectMidiFailure((error: any) => {
            console.log(error)
            console.log('ayylmao')
            this.noDetectedMidiDeviceErrorText.setAlpha(1)
        })

        keyboard.setOnConnectMidiSuccess((error: any) => {
            console.log(error)
            console.log('ayylmao')
            this.context.keyboardConnection = keyboard;
            this.scene.start('settings', this.context)
        })
        keyboard.connectMidi()
    }

    private onVirtualKeyboardButtonClick = () => {
        
        this.context.isVirtualKeyboard = true;
        let baseSettings = new GameSettings()
            .setKeySigNote(KeySigNote.C)
            .setKeySigMode(KeySigMode.MAJOR)
            .setLeftMin(36) // c2
            .setLeftMax(64) // e4
            .setRightMin(57) // a3
            .setRightMax(84) // c6
            .setLength(30)
            .setChordPool(ChordPool.NOTE)

        this.context.settings = baseSettings;
        this.scene.start('hands', this.context)
    }

}
