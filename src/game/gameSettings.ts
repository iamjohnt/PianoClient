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
    
    constructor(
        note: KeySigNote,
        mode: KeySigMode,
        gameMode: ChordPool,
        hand: WhichHands,
        lmin: number,
        lmax: number,
        rmin: number,
        rmax: number,
        len: number
    ) {
        this.keySigNote = note;
        this.keySigMode = mode;
        this.chordPool = gameMode;
        this.whichHands = hand;
        this.leftMin =  lmin;
        this.leftMax = lmax;
        this.rightMin = rmin;
        this.rightMax = rmax;
        this.length = len;
    }

}