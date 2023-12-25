import { KeySigFull } from "./Enums";

export default class MusicUtil {

    private whiteNotesSet: Set<number>;
    private whiteNotesArray: Array<number>;

    constructor() {
        this.whiteNotesSet = new Set();
        this.whiteNotesArray = new Array();
        this.populateWhiteNotesSetAndArray();
    }

    public isWhiteKey = (midi_note: number) => {
        return this.whiteNotesSet.has(midi_note);
    }

    public isBlackKey = (midi_note: number) => {
        return !this.whiteNotesSet.has(midi_note);
    }

    public getWhiteNotes = (): Array<number> => {
        return this.whiteNotesArray;
    }

    private populateWhiteNotesSetAndArray = () => {

        let A0 = 21;
        let C8 = 108;
        let a_minor_jumps: Array<number> = [2,1,2,2,1,2,2]
        
        let curNote = A0;
        let curJump = 0;

        // start at first piano key A0, and keep jumping up the keys according to the A Minor pattern
        // at every jump is a white key, so record it
        while (curNote <= C8) {
            this.whiteNotesArray.push(curNote);
            this.whiteNotesSet.add(curNote);

            curNote = curNote + a_minor_jumps[curJump];

            curJump = (curJump + 1) % a_minor_jumps.length;
        }
    }



}