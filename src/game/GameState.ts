export default class GameState {

    private chordSeq: Array<Set<number>>;
    private curIndex = 0;
    private isActive: boolean;
    private isStillHaveChords: boolean = false;

    constructor() {
        
    }

    public populateChordSeq = (chordSeqIn: Array<Set<number>>) => {
        // be careful of empty arrays
        this.chordSeq = chordSeqIn;
        this.isStillHaveChords = true;
    }

    public getCurPointer = () => {
        return this.curIndex;
    }

    public checkChordAndAdvanceIfCorrect = (submittedChord: Set<number>): Set<number> => {
        let curChord = this.chordSeq[this.curIndex];
        if (submittedChord == curChord) {
            this.curIndex++;
            if (this.curIndex >= this.chordSeq.length) {
                this.isStillHaveChords = false;
            }
        }
        return curChord;
    }

    public getIsActive = () => {
        return this.isActive;
    }

    public setIsActive = (bool: boolean) => {
        this.isActive = bool;
    }
}