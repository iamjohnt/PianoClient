import ChromaticNotes from "./ChromaticNotes";
import { KeySigNote, KeySigMode, Accidental, KeySigFull } from "./Enums";
import KeySigAccidentalMap from "./KeySigAccidentalMap";

export default class KeySignature {

    private note: KeySigNote;
    private mode: KeySigMode;
    private accidental: Accidental;
    private chromaticNotes: ChromaticNotes;

    private keySigAccMap: KeySigAccidentalMap;

    constructor(note: KeySigNote, mode: KeySigMode) {

        this.note = note;
        this.mode = mode;

        this.keySigAccMap = new KeySigAccidentalMap();
        this.accidental = this.keySigAccMap.getAccidental(note, mode);

        this.chromaticNotes = new ChromaticNotes(note, mode);

    }

    public getAccidental = (): Accidental | undefined => {
        return this.accidental;
    }

    public isChromatic = (midi_note: number): boolean => {
        return this.chromaticNotes.isChromatic(midi_note);
    }
}
