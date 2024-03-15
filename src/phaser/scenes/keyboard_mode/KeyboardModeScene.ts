import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import GameContext from "../../GameContext";
import ObjectPositions from "../../ObjectPositions";

export default class KeyboardModeScene extends Phaser.Scene{

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

        let errorX = ObjectPositions.WIDTH() * (3/4) - 100
        let errorY = ObjectPositions.HEIGHT() * (9.5/10)
        let error_no_midi = this.add.text(errorX, errorY, 'error, no connected midi devices detected')
            .setColor('#ff0000')
            .setAlpha(0)
            .setFontFamily('Arial')
            .setFontSize(48)
            .setOrigin(.5, .5)

        let virtualX = ObjectPositions.WIDTH() * (1/4) + 100
        let virtualY = ObjectPositions.HEIGHT() * (1.25/3)
        let virtual_button = this.add.image(virtualX, virtualY, 'virtual')
            .setOrigin(.5, .5)
            .setScale(.70)
            .setInteractive()
            .on('pointerdown', () => {
                this.context.isVirtualKeyboard = true;
                this.scene.start('settings', this.context)
            })
        
        let connectedX = ObjectPositions.WIDTH() * (3/4) - 100
        let connectedY = ObjectPositions.HEIGHT() * (1.25/3)
        let connected_button = this.add.image(connectedX, connectedY, 'connected')
            .setOrigin(.5, .5)
            .setScale(.70)
            .setInteractive()
            .on('pointerdown', () => {
                this.context.isVirtualKeyboard = false;

                // init keyboard
                let keyboard = new KeyboardConnection()
                keyboard.setOnConnectMidiFailure((error: any) => {
                    console.log(error)
                    console.log('ayylmao')
                    error_no_midi.setAlpha(1)
                })

                keyboard.setOnConnectMidiSuccess((error: any) => {
                    console.log(error)
                    console.log('ayylmao')
                    this.context.keyboardConnection = keyboard;
                    this.scene.start('settings', this.context)
                })
                keyboard.connectMidi()
            })

        let textX = ObjectPositions.WIDTH() * (3/4) - 100
        let textY = ObjectPositions.HEIGHT() * (3.25/4)
        let required_text = this.add.image(textX, textY, 'required')
            .setOrigin(.5, .5)
            .setScale(.9)



            
    }


}
