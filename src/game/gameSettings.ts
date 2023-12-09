export class GameSettings {

    public keySigNote;
    public keySigMode;
    public chordPool;
    public whichHands;
    public leftMin;
    public leftMax;
    public rightMin;
    public rightMax;
    public length;
    
    constructor() {
        this.keySigNote = 'C';
        this.keySigMode = 'MAJOR';
        this.chordPool = 'NOTE';
        this.whichHands = 'LEFT';
        this.leftMin =  21;
        this.leftMax = 44;
        this.rightMin = 60;
        this.rightMax = 80;
        this.length = 25;
    }

}