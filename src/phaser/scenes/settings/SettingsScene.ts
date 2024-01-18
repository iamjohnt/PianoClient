import { GameObjects } from "phaser";
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

    private singleContainer: GameObjects.Container;
    private comboContainer: GameObjects.Container;

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
    };

    public update = () => {

    }

    private createSingleModeButtons = () => {
        let text = this.add.image(POS.SINGLE_TEXT_CENTER_X(), POS.SINGLE_TEXT_CENTER_Y(), 'single_text').setOrigin(0, 0).setInteractive()
        let note = this.add.sprite(POS.NOTE_BTN_X(), POS.NOTE_BTN_Y(), 'note').setOrigin(0, 0).setInteractive()
        let interval = this.add.sprite(POS.INTERVAL_BTN_X(), POS.INTERVAL_BTN_Y(), 'interval').setOrigin(0, 0).setInteractive()
        let triad = this.add.sprite(POS.TRIAD_BTN_X(), POS.TRIAD_BTN_Y(), 'triad').setOrigin(0, 0).setInteractive()
        let tetrad = this.add.sprite(POS.TETRAD_BTN_X(), POS.TETRAD_BTN_Y(), 'tetrad').setOrigin(0, 0).setInteractive()

        note.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.NOTE); this.scene.start('hands', this.context)})
        interval.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.INTERVAL); this.scene.start('hands', this.context)})
        triad.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.TRIAD); this.scene.start('hands', this.context)})
        tetrad.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.TETRAD); this.scene.start('hands', this.context)})

        this.singleContainer = this.add.container(0, 0, [text, note, interval, triad, tetrad])

    }

    private createComboModeButtons = () => {
        let text = this.add.image(POS.COMBO_TEXT_CENTER_X(), POS.COMBO_TEXT_CENTER_Y(), 'combo_text').setOrigin(0, 0).setInteractive();
        let note_interval = this.add.sprite(POS.NOTE_INTERVAL_X(), POS.NOTE_INTERVAL_Y(), 'note_interval').setOrigin(0, 0).setInteractive();
        let note_interval_triad = this.add.sprite(POS.NOTE_INTERVAL_TRIAD_X(), POS.NOTE_INTERVAL_TRIAD_Y(), 'note_interval_triad').setOrigin(0, 0).setInteractive();
        let note_interval_triad_tetrad = this.add.sprite(POS.NOTE_INTERVAL_TRIAD_TETRAD_X(), POS.NOTE_INTERVAL_TRIAD_TETRAD_Y(), 'note_interval_triad_tetrad').setOrigin(0, 0).setInteractive();
    
        note_interval.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.NOTE_INTERVAL); this.scene.start('hands', this.context)})
        note_interval_triad.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.NOTE_INTERVAL_TRIAD); this.scene.start('hands', this.context)})
        note_interval_triad_tetrad.on('pointerdown', () => {this.context.settings.setChordPool(ChordPool.NOTE_INTERVAL_TRIAD_TETRAD); this.scene.start('hands', this.context)}) 

        this.comboContainer = this.add.container(0, 0, [text, note_interval, note_interval_triad, note_interval_triad_tetrad])
    }
}