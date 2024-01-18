import GameContext from "../../GameContext";

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
        
        let hands = 'assets/settings/hands/'

    }

    public create = () => {

    }

    public update = () => {

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