import { KeySigMode, KeySigNote } from "./Enums";

export default class ChromaticNotes {

    private chromaticNotes: Set<number>;

    constructor(note: KeySigNote, mode: KeySigMode) {
        this.chromaticNotes = this.calcChromaticNotes(note, mode)
    }

    public isChromatic(midi_note: number) {
        return this.chromaticNotes.has(midi_note);
    }

    private calcChromaticNotes = (note: KeySigNote, mode: KeySigMode): Set<number> => {
        let nextIntervals: Array<number> = this.getModePatterns(mode);
        let startingNote: number = this.getFirstNoteOnPiano(note);
        let curNote: number = startingNote;
        let curInterval = 0;

        let chromaticNotes: Set<number> = new Set();

        // while going up the piano, add chromatic notes
        while (curNote <= 108) {
            chromaticNotes.add(curNote);
            curNote += nextIntervals[curInterval];
            curInterval = (curInterval + 1) % 7;
        }

        // while going down the piano, add chromatic notes
        curNote = startingNote;
        curInterval = nextIntervals.length - 1;
        while (curNote >= 21) {
            chromaticNotes.add(curNote);
            curNote -= nextIntervals[curInterval];
            curInterval = (curInterval - 1) % 7;
            if (curInterval < 0) {
                curInterval += 7;
            }
        }

        return chromaticNotes;
    }

    private getFirstNoteOnPiano(note: KeySigNote): number {
        let base: number = -1;
        switch (note) {
            case KeySigNote.A: base = 21; break;
            case KeySigNote.A_SHARP: base = 22; break;
            case KeySigNote.B_FLAT: base = 22; break;
            case KeySigNote.B: base = 23; break;
            case KeySigNote.C: base = 24; break;
            case KeySigNote.C_SHARP: base = 25; break;
            case KeySigNote.D_FLAT: base = 25; break;
            case KeySigNote.D: base = 26; break;
            case KeySigNote.D_SHARP: base = 27; break;
            case KeySigNote.E_FLAT: base = 27; break;
            case KeySigNote.E: base = 28; break;
            case KeySigNote.F: base = 29; break;
            case KeySigNote.F_SHARP: base = 30; break;
            case KeySigNote.G_FLAT: base = 30; break;
            case KeySigNote.G: base = 31; break;
            case KeySigNote.G_SHARP: base = 32; break;
            case KeySigNote.A_FLAT: base = 32; break;
        }
        return base;
    }

    private getModePatterns = (mode: KeySigMode) => {
        let rtn: Array<number>;
        switch (mode) {
            case KeySigMode.MAJOR: {
                rtn = [2, 2, 1, 2, 2, 2, 1];
                break;
            }
            case KeySigMode.MINOR: {
                rtn = [2, 1, 2, 2, 1, 2, 2];
                break;
            }
        }
        return rtn;
    }
}