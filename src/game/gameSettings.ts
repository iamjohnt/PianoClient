import { KeySigNote, KeySigMode, ChordPool, WhichHands } from "./Enum";

export class GameSettings {

    public keySigNote: KeySigNote;
    public keySigMode: KeySigMode;
    public chordPool: ChordPool;
    public whichHands: WhichHands;
    public leftMin: number;
    public leftMax: number;
    public rightMin: number;
    public rightMax: number;
    public length: number;
    
    constructor() {

    }
    
    // constructor(
    //     note: KeySigNote,
    //     mode: KeySigMode,
    //     gameMode: ChordPool,
    //     hand: WhichHands,
    //     lmin: number,
    //     lmax: number,
    //     rmin: number,
    //     rmax: number,
    //     len: number
    // ) {
    //     this.keySigNote = note;
    //     this.keySigMode = mode;
    //     this.chordPool = gameMode;
    //     this.whichHands = hand;
    //     this.leftMin =  lmin;
    //     this.leftMax = lmax;
    //     this.rightMin = rmin;
    //     this.rightMax = rmax;
    //     this.length = len;
    // }

    // Getters
    public getKeySigNote(): KeySigNote {
        return this.keySigNote;
    }

    public getKeySigMode(): KeySigMode {
        return this.keySigMode;
    }

    public getChordPool(): ChordPool {
        return this.chordPool;
    }

    public getWhichHands(): WhichHands {
        return this.whichHands;
    }

    public getLeftMin(): number {
        return this.leftMin;
    }

    public getLeftMax(): number {
        return this.leftMax;
    }

    public getRightMin(): number {
        return this.rightMin;
    }

    public getRightMax(): number {
        return this.rightMax;
    }

    public getLength(): number {
        return this.length;
    }

    // Setters
    public setKeySigNote(value: KeySigNote): this {
        this.keySigNote = value;
        return this;
    }

    public setKeySigMode(value: KeySigMode): this {
        this.keySigMode = value;
        return this;
    }

    public setChordPool(value: ChordPool): this {
        this.chordPool = value;
        return this;
    }

    public setWhichHands(value: WhichHands): this {
        this.whichHands = value;
        return this;
    }

    public setLeftMin(value: number): this {
        this.leftMin = value;
        return this;
    }

    public setLeftMax(value: number): this {
        this.leftMax = value;
        return this;
    }

    public setRightMin(value: number): this {
        this.rightMin = value;
        return this;
    }

    public setRightMax(value: number): this {
        this.rightMax = value;
        return this;
    }

    public setLength(value: number): this {
        this.length = value;
        return this;
    }

}