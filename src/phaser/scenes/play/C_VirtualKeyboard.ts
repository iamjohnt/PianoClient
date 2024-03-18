import { GameObjects } from "phaser";
import ChordBuffer from "../../../keyboard_connection/ChordBuffer";
import MidiObservable from "../../../keyboard_connection/MidiObservable";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import { WhichHands } from "../../../music_model/Enums";

export default class C_VirtualKeyboard extends GameObjects.Container{

    // private testText: GameObjects.Text;

    public chordBuffer: MidiObservable; 

    private playerChordManager: MidiObservable;

    constructor(scene: Phaser.Scene, x: number, y: number, hand: WhichHands) {
        super(scene, x, y)
        scene.add.existing(this)

        this.createPianoBase(scene)

        if (hand == WhichHands.LEFT) {
            this.spawnLeftHandKeys();
        } else if (hand == WhichHands.RIGHT) {
            this.spawnRightHandKeys();
        } else {
            console.error("ERROR: clef is neither bass or treble clef: " + hand)
        }
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
            this.playerChordManager.onUpdate(new MidiMessage(144, midivalue, 100))
        })
        .on('pointerout', () => {
            key.setFillStyle(0Xffffff);
            console.log('pointer out')
            this.playerChordManager.onUpdate(new MidiMessage(144, midivalue, 0))
        })
        this.add(key)
    }

    private createBlackKey = (x: number, midivalue: number) => {
        let key = this.scene.add.rectangle(x, 20, 69, 150, 0X000000)
        .setOrigin(0, 0)
        .setInteractive()
        .on('pointerdown', () => {
            key.setFillStyle(0X303030);
            console.log(midivalue.toString())
            this.chordBuffer.onUpdate(new MidiMessage(144, midivalue, 100));
            this.playerChordManager.onUpdate(new MidiMessage(144, midivalue, 100))
        })
        .on('pointerout', () => {
            key.setFillStyle(0X000000);
            this.playerChordManager.onUpdate(new MidiMessage(144, midivalue, 0))
        })
        this.add(key)
    }



    public addNoteObserver = (observer: MidiObservable) => {
        this.playerChordManager = observer;
    }

    private spawnLeftHandKeys = () => {
        this.createWhiteKey(0, 36) // C2
        this.createWhiteKey(100, 38)
        this.createWhiteKey(200, 40)
        this.createWhiteKey(300, 41) // e
        this.createWhiteKey(400, 43)
        this.createWhiteKey(500, 45)
        this.createWhiteKey(600, 47)
        this.createWhiteKey(700, 48) 
        this.createWhiteKey(800, 50)
        this.createWhiteKey(900, 52)
        this.createWhiteKey(1000, 53)
        this.createWhiteKey(1100, 55)
        this.createWhiteKey(1200, 57)
        this.createWhiteKey(1300, 59)
        this.createWhiteKey(1400, 60)
        this.createWhiteKey(1500, 62)
        this.createWhiteKey(1600, 64)

        this.createBlackKey(62, 37)
        this.createBlackKey(162, 39)
        this.createBlackKey(362, 42)
        this.createBlackKey(462, 44)
        this.createBlackKey(562, 46)
        this.createBlackKey(762, 49)
        this.createBlackKey(862, 51)
        this.createBlackKey(1062, 54)
        this.createBlackKey(1162, 56)
        this.createBlackKey(1262, 58)
        this.createBlackKey(1462, 61)
        this.createBlackKey(1562, 63)
        this.createBlackKey(1762, 65)
    }

    private spawnRightHandKeys = () => {
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

        this.createBlackKey(-38, 56) // a flat 3
        this.createBlackKey(62, 58)
        this.createBlackKey(262, 61)
        this.createBlackKey(362, 63)
        this.createBlackKey(562, 66)
        this.createBlackKey(662, 68)
        this.createBlackKey(762, 70)
        this.createBlackKey(962, 73)
        this.createBlackKey(1062, 75)
        this.createBlackKey(1262, 78)
        this.createBlackKey(1362, 80)
        this.createBlackKey(1462, 82)
        this.createBlackKey(1662, 85) // c sharp 6
        this.createBlackKey(1762, 87) // c sharp 6

    }

}