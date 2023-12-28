import { Accidental, KeySigMode, KeySigNote } from "./Enums";

export default class KeySigAccidentalMap {

    private keySigMap: Map<string, Accidental>;

    constructor() {

        this.keySigMap = new Map();

        // add mappings of key signatures to their accidentals

        // natural root major
        this.keySigMap.set(this.concat(KeySigNote.C, KeySigMode.MAJOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.D, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.E, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.F, KeySigMode.MAJOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.G, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.A, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.B, KeySigMode.MAJOR), Accidental.SHARP)

        // Natural Root Minor
        this.keySigMap.set(this.concat(KeySigNote.C, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.D, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.E, KeySigMode.MINOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.F, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.G, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.A, KeySigMode.MINOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.B, KeySigMode.MINOR), Accidental.SHARP)

        // Sharp Root Major
        this.keySigMap.set(this.concat(KeySigNote.C_SHARP, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.D_SHARP, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.F_SHARP, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.G_SHARP, KeySigMode.MAJOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.A_SHARP, KeySigMode.MAJOR), Accidental.SHARP)

        // Sharp Root Minor
        this.keySigMap.set(this.concat(KeySigNote.C_SHARP, KeySigMode.MINOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.D_SHARP, KeySigMode.MINOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.F_SHARP, KeySigMode.MINOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.G_SHARP, KeySigMode.MINOR), Accidental.SHARP)
        this.keySigMap.set(this.concat(KeySigNote.A_SHARP, KeySigMode.MINOR), Accidental.SHARP)


        // Flat Root Major
        this.keySigMap.set(this.concat(KeySigNote.D_FLAT, KeySigMode.MAJOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.E_FLAT, KeySigMode.MAJOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.G_FLAT, KeySigMode.MAJOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.A_FLAT, KeySigMode.MAJOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.B_FLAT, KeySigMode.MAJOR), Accidental.FLAT)

        // Flat Root Minor
        this.keySigMap.set(this.concat(KeySigNote.D_FLAT, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.E_FLAT, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.G_FLAT, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.A_FLAT, KeySigMode.MINOR), Accidental.FLAT)
        this.keySigMap.set(this.concat(KeySigNote.B_FLAT, KeySigMode.MINOR), Accidental.FLAT)

    }

    public getAccidental = (note: KeySigNote, mode: KeySigMode): Accidental => {
        let result = this.keySigMap.get(this.concat(note, mode));
        if (result == undefined) {
            console.log("accidental not found, error")
            return Accidental.NATURAL;
        } else {
            return result;
        }
    }

    private concat(e1: KeySigNote, e2: KeySigMode): string {
        return `${KeySigNote[e1]}${KeySigMode[e2]}`;
    }
    

}