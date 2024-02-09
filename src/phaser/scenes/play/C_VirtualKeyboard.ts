import { GameObjects } from "phaser";
import ChordBuffer from "../../../keyboard_connection/ChordBuffer";
import ChordObservable from "../../../keyboard_connection/ChordObservable";
import MidiObservable from "../../../keyboard_connection/MidiObservable";
import MidiMessage from "../../../keyboard_connection/MidiMessage";

export default class C_VirtualKeyboard extends GameObjects.Container{

    // private testText: GameObjects.Text;

    public chordBuffer: MidiObservable; 

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        scene.add.existing(this)

        // this.testText = scene.add.text(800, -200, 'hello')
        //     .setFontFamily('Arial')
        //     .setFontSize(72)
        //     .setFill('#000000')

        // this.add(this.testText)

        this.createPianoBase(scene)

        this.createWhiteKey(0, 57) // a3
        this.createWhiteKey(100, 59)
        this.createWhiteKey(200, 60)
        this.createWhiteKey(300, 62)
        this.createWhiteKey(400, 64)
        this.createWhiteKey(500, 65)
        this.createWhiteKey(600, 67)
        this.createWhiteKey(700, 69)
        this.createWhiteKey(800, 71)
        this.createWhiteKey(900, 72)
        this.createWhiteKey(1000, 74)
        this.createWhiteKey(1100, 76)
        this.createWhiteKey(1200, 77)
        this.createWhiteKey(1300, 79)
        this.createWhiteKey(1400, 81)
        this.createWhiteKey(1500, 83)
        this.createWhiteKey(1600, 84) // c6

        this.createBlackKey(0, 56) // a flat 3
        this.createBlackKey(100, 58)
        this.createBlackKey(300, 61)
        this.createBlackKey(400, 63)
        this.createBlackKey(600, 66)
        this.createBlackKey(700, 68)
        this.createBlackKey(800, 70)
        this.createBlackKey(1000, 73)
        this.createBlackKey(1100, 75)
        this.createBlackKey(1300, 78)
        this.createBlackKey(1400, 80)
        this.createBlackKey(1500, 82)
        this.createBlackKey(1700, 85) // c sharp 6
    }

    public setChordBuffer = (chordBuffer: ChordBuffer) => {
        this.chordBuffer = chordBuffer;
    }

    private createPianoBase = (scene: Phaser.Scene) => {
        let base = scene.add.rectangle(-60, 0, 1820, 350, 0X000000)
            .setOrigin(0, 0)
        this.add(base)
    }

    private createWhiteKey = (x: number, midivalue: number) => {
        let key = this.scene.add.rectangle(x, 20, 95, 280, 0Xffffff)
        .setOrigin(0, 0)
        .setInteractive()
        .on('pointerdown', () => {
            key.setFillStyle(0XC8C8C8);
            console.log(midivalue.toString())
            this.chordBuffer.onUpdate(new MidiMessage(144, midivalue, 100));
        })
        .on('pointerout', () => {
            key.setFillStyle(0Xffffff);
        })
        .on('pointerup', () => {
            key.setFillStyle(0Xffffff);
        })
        this.add(key)
    }

    private createBlackKey = (x: number, midivalue: number) => {
        let key = this.scene.add.rectangle(x, 20, 69, 150, 0X000000)
        .setOrigin(.5, 0)
        .setInteractive()
        .on('pointerdown', () => {
            key.setFillStyle(0X303030);
            console.log(midivalue.toString())
            this.chordBuffer.onUpdate(new MidiMessage(144, midivalue, 100));
        })
        .on('pointerout', () => {
            key.setFillStyle(0X000000);
        })
        .on('pointerup', () => {
            key.setFillStyle(0X000000);
        })
        this.add(key)
    }

}