import { ChordPool, KeySigMode, KeyboardType, WhichHands } from "../../../game/Enum";
import { GameSettings } from "../../../game/GameSettings";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";
import { KeySigNote } from "../../../music_model/Enums";
import MidiToSheetNote from "../../../music_model/MidiToSheetNote";
import SettingsResponse from "../../../stomp_connection/response_objects/SettingsResponse";
import GameContext from "../../GameContext";
import POS from "../../ObjectPositions";

export default class SettingsScene extends Phaser.Scene{

    private context: GameContext;

    constructor() {
        super({ key: 'settings' });
    }

    public init = (context: GameContext) => {
        this.context = context;
        
        let baseSettings = new GameSettings()
            .setKeySigNote(KeySigNote.C)
            .setKeySigMode(KeySigMode.MAJOR)
            .setLeftMin(36) // c2
            .setLeftMax(64) // e4
            .setRightMin(57) // a4
            .setRightMax(84) // c6
            .setLength(30)

        this.context.settings = baseSettings;
    }

    public preload = () => {
    
        let chordpool = 'assets/settings/chordpool/'
        let hands = 'assets/settings/hands/'
        
        this.load.image('single_text', chordpool + 'single_text.png')
        this.load.image('note', chordpool + 'note.png')
        this.load.image('interval', chordpool + 'interval.png')
        this.load.image('triad', chordpool + 'triad.png')
        this.load.image('tetrad', chordpool + 'tetrad.png')

        this.load.image('combo_text', chordpool + 'combo_text.png')
        this.load.image('note_interval', chordpool + 'note_interval.png')
        this.load.image('note_interval_triad', chordpool + 'note_interval_triad.png')
        this.load.image('note_interval_triad_tetrad', chordpool + 'note_interval_triad_tetrad.png')




    };
    
    public create = () => {

        this.createSingleModeButtons()
        this.createComboModeButtons()

        // each group of buttons below adds a setting on click. settings must be chosen in the below order
        // this.createChordPoolButtons()
        // this.createWhichHandButtons()
        // this.createKeyboardTypeButtons()

        // const submit = this.createBasicButton(0, 1000, 'Submit Settings', () => {
        //     this.sendSettingsToServerGoNextScene();
        // })
    };

    public update = () => {

    }

    private createSingleModeButtons = () => {
        let text = this.add.image(POS.SINGLE_TEXT_CENTER_X(), POS.SINGLE_TEXT_CENTER_Y(), 'single_text').setOrigin(0, 0).setInteractive()
        let note = this.add.sprite(POS.NOTE_BTN_X(), POS.NOTE_BTN_Y(), 'note').setOrigin(0, 0).setInteractive()
        let interval = this.add.sprite(POS.INTERVAL_BTN_X(), POS.INTERVAL_BTN_Y(), 'interval').setOrigin(0, 0).setInteractive()
        let triad = this.add.sprite(POS.TRIAD_BTN_X(), POS.TRIAD_BTN_Y(), 'triad').setOrigin(0, 0).setInteractive()
        let tetrad = this.add.sprite(POS.TETRAD_BTN_X(), POS.TETRAD_BTN_Y(), 'tetrad').setOrigin(0, 0).setInteractive()

        note.on('pointerdown', () => {console.log('asdfasdfasdf')})
        interval.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.INTERVAL)})
        triad.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.TRIAD)})
        tetrad.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.TETRAD)})
    }

    private createComboModeButtons = () => {
        this.add.image(POS.COMBO_TEXT_CENTER_X(), POS.COMBO_TEXT_CENTER_Y(), 'combo_text').setOrigin(0, 0).setInteractive();
        this.add.sprite(POS.NOTE_INTERVAL_X(), POS.NOTE_INTERVAL_Y(), 'note_interval').setOrigin(0, 0).setInteractive();
        this.add.sprite(POS.NOTE_INTERVAL_TRIAD_X(), POS.NOTE_INTERVAL_TRIAD_Y(), 'note_interval_triad').setOrigin(0, 0).setInteractive();
        this.add.sprite(POS.NOTE_INTERVAL_TRIAD_TETRAD_X(), POS.NOTE_INTERVAL_TRIAD_TETRAD_Y(), 'note_interval_triad_tetrad').setOrigin(0, 0).setInteractive();
    }

    // private createChordPoolButtons = () => {
    //     const level_1 = this.createBasicButton(0, 100, 'Level 1 - NOTE', () => {this.context.settings.setChordPool(ChordPool.NOTE)});
    //     const level_2 = this.createBasicButton(0, 200, 'Level 2 - INTERVAL', () => {this.context.settings.setChordPool(ChordPool.INTERVAL)});
    //     const level_3 = this.createBasicButton(0, 300, 'Level 3 - TRIAD', () => {this.context.settings.setChordPool(ChordPool.TRIAD)});
    //     const level_4 = this.createBasicButton(0, 400, 'Level 4 - TETRAD', () => {this.context.settings.setChordPool(ChordPool.TETRAD)});
    //     const level_5 = this.createBasicButton(0, 500, 'Level 5 - NOTE_INTERVAL', () => {this.context.settings.setChordPool(ChordPool.NOTE_INTERVAL)});
    //     const level_6 = this.createBasicButton(0, 600, 'Level 6 - NOTE_INTERVAL_TRIAD', () => {this.context.settings.setChordPool(ChordPool.NOTE_INTERVAL_TRIAD)});
    //     const level_7 = this.createBasicButton(0, 700, 'Level 7 - NOTE_INTERVAL_TRIAD_TETRAD', () => {this.context.settings.setChordPool(ChordPool.NOTE_INTERVAL_TRIAD_TETRAD)});

    // }

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

    // private createKeyboardTypeButtons = () => {
    //     const visual_keyboard = this.createBasicButton(1200, 200, 'Visual Keyboard', () => {
    //         this.context.keyboardType = KeyboardType.VIRTUAL
    //     })
        
    //     const connected_keyboard = this.createBasicButton(1200, 600, 'Connected Keyboard', () => {
    //         this.context.keyboardType = KeyboardType.CONNECTED;
    //         this.context.keyboardConnection = new KeyboardConnection();
    //         this.context.keyboardConnection.connectMidi();
    //     })
    // }

    // private createBasicButton = (x: number, y: number, text: string, callback: Function): Phaser.GameObjects.Text => {
    //     return this.add.text(x, y, text)
    //         .setFontSize(72)
    //         .setColor('black')
    //         .setInteractive()
    //         .on('pointerdown', callback)
    // }
    
    // private sendSettingsToServerGoNextScene = () => {

    //     this.context.stompService.stompIn.subscribeSettingsResponse((settings: SettingsResponse) => {
    //         this.scene.start('game', this.context)
    //     })
    //     this.context.stompService.stompOut.sendGameSettings(this.context.settings);
    // }


}