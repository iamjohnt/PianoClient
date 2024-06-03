import { GameSettings } from "../../../game/GameSettings";
import { KeyboardType, WhichHands } from "../../../music_model/Enums";
import MidiToSheetNote from "../../../music_model/MidiToSheetNote";
import SettingsResponse from "../../../stomp_connection/response_objects/SettingsResponse";
import GameContext from "../../GameContext";
import P from "../../ObjectPositions";

export default class HandScene extends Phaser.Scene{

    private context: GameContext;

    constructor() {
        super({ key: 'hands' });
    }

    public init = (context: GameContext) => {
        this.context = context;
        console.log('hand ayy lmao')
        console.log(this.context.settings.chordPool)
    }

    public preload = () => {
        let base = 'assets/settings/hands/'
        this.load.image('piano', base + 'piano.png')
        this.load.image('left', base + 'left_hand.png')
        this.load.image('right', base + 'right_hand.png')
        this.load.image('text', base + 'text.png')
        this.load.image('back', 'assets/global/back.png')
    }

    public create = () => {

        let piano = this.add.image(P.CHOOSE_HAND_PIANO_LEFT_X(), P.CHOOSE_HAND_PIANO_TOP_Y(), 'piano').setOrigin(0, 0)
        let textPrompt = this.add.image(P.CHOOSE_HAND_TEXT_PROMPT_CENTER_X(), P.CHOOSE_HAND_TEXT_PROMPT_CENTER_Y(), 'text')

        let leftHand = this.add.image(P.LEFT_HAND_CENTER_X(), P.LEFT_HAND_CENTER_Y(), 'left')
            .setInteractive()
            .on('pointerdown', () => {
                this.context.settings.whichHands = WhichHands.LEFT;
                this.context.keyboardType = KeyboardType.CONNECTED; // will have separate scene to decide this later
                this.context.converter = new MidiToSheetNote(
                    this.context.settings.getKeySigNote(),
                    this.context.settings.getKeySigMode(),
                    this.context.settings.getWhichHands(),
                )
                this.sendSettingsToServerGoNextScene()
            })

        let rightHand = this.add.image(P.RIGHT_HAND_CENTER_X(), P.RIGHT_HAND_CENTER_Y(), 'right')
            .setInteractive()
            .on('pointerdown', () => {
                this.context.settings.whichHands = WhichHands.RIGHT;
                this.context.converter = new MidiToSheetNote(
                    this.context.settings.getKeySigNote(),
                    this.context.settings.getKeySigMode(),
                    this.context.settings.getWhichHands(),
                )
                this.context.keyboardType = KeyboardType.CONNECTED;
                this.sendSettingsToServerGoNextScene()
            })

        this.createBackButton()
    }

    public update = () => {

    }


    // private createWhichHandButtons = () => {
    //     const left_hand = this.createBasicButton(0, 800, 'Left Hand', () => {
    //         this.context.settings.setWhichHands(WhichHands.LEFT)
    //         this.context.converter = new MidiToSheetNote(
    //             this.context.settings.getKeySigNote(),
    //             this.context.settings.getKeySigMode(),
    //             this.context.settings.getWhichHands(),
    //         )
    //     })
    //     const right_hand = this.createBasicButton(0, 900, 'Right Hand', () => {
    //         this.context.settings.setWhichHands(WhichHands.RIGHT)
    //         this.context.converter = new MidiToSheetNote(
    //             this.context.settings.getKeySigNote(),
    //             this.context.settings.getKeySigMode(),
    //             this.context.settings.getWhichHands(),
    //         )
    //     })
    // }
        
    
    private sendSettingsToServerGoNextScene = () => {

        let nextSceneId = ''
        if (this.context.isVirtualKeyboard) {
            nextSceneId = 'play_virtual_keyboard'
        } else {
            nextSceneId = 'game'
        }

        this.context.stompService.stompIn.subscribeSettingsResponse((settings: SettingsResponse) => {
            this.scene.start(nextSceneId, this.context)
        })
        this.context.stompService.stompOut.sendGameSettings(this.context.settings);
    }

    private createBackButton = () => {
        this.add.image(200, 150, 'back')
            .setOrigin(.5, .5)
            .setScale(1.5)
            .setDepth(4)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.context.isVirtualKeyboard == true) {
                    // the previous scene should be keyboard scene, so go back there
                    // reset settings, that was established in previous KeyboardModeScene, allowing app to go back with reset settings
                    this.context.settings = new GameSettings();
                    this.scene.start('keyboardmode', this.context);
                } else {
                    // the previous cene should be settings scene (which handles setting chord pool), so go back there
                    this.scene.start('settings', this.context);
                }
            })
    }

}