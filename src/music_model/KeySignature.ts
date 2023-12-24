import { KeySigNote, KeySigMode, Accidental, KeySigFull } from "./Enums";

export default class KeySignature {

    private note: KeySigNote;
    private mode: KeySigMode;
    private accidental: Accidental;

    constructor(note: KeySigNote, mode: KeySigMode) {

        this.note = note;
        this.mode = mode;

        let fullKeySig = this.getKeySigFull(note, mode);
        
        this.accidental = this.determineAccidental(fullKeySig);
    }

    private determineAccidental = (keySig: KeySigFull): Accidental => {

        let acc: Accidental;
        
        switch (keySig) {
            // Natural Root Major
            case KeySigFull.C_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.D_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.E_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.F_MAJOR: acc = Accidental.FLAT; break;
            case KeySigFull.G_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.A_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.B_MAJOR: acc = Accidental.SHARP; break;
        
            // Natural Root Minor
            case KeySigFull.C_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.D_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.E_MINOR: acc = Accidental.SHARP; break;
            case KeySigFull.F_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.G_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.A_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.B_MINOR: acc = Accidental.SHARP; break;
        
            // Sharp Root Major
            case KeySigFull.C_SHARP_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.D_SHARP_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.F_SHARP_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.G_SHARP_MAJOR: acc = Accidental.SHARP; break;
            case KeySigFull.A_SHARP_MAJOR: acc = Accidental.SHARP; break;
            
            // Sharp Root Minor
            case KeySigFull.C_SHARP_MINOR: acc = Accidental.SHARP; break;
            case KeySigFull.D_SHARP_MINOR: acc = Accidental.SHARP; break;
            case KeySigFull.F_SHARP_MINOR: acc = Accidental.SHARP; break;
            case KeySigFull.G_SHARP_MINOR: acc = Accidental.SHARP; break;
            case KeySigFull.A_SHARP_MINOR: acc = Accidental.SHARP; break;

            // Flat Root Major
            case KeySigFull.D_FLAT_MAJOR: acc = Accidental.FLAT; break;
            case KeySigFull.E_FLAT_MAJOR: acc = Accidental.FLAT; break;
            case KeySigFull.G_FLAT_MAJOR: acc = Accidental.FLAT; break;
            case KeySigFull.A_FLAT_MAJOR: acc = Accidental.FLAT; break;
            case KeySigFull.B_FLAT_MAJOR: acc = Accidental.FLAT; break;

            // Flat Root Minor
            case KeySigFull.D_FLAT_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.E_FLAT_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.G_FLAT_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.A_FLAT_MINOR: acc = Accidental.FLAT; break;
            case KeySigFull.B_FLAT_MINOR: acc = Accidental.FLAT; break;
        }
        return acc;
    }

    private getKeySigFull = (note: KeySigNote, mode: KeySigMode): KeySigFull => {

        let keySig: KeySigFull;

        if (note == KeySigNote.C && mode == KeySigMode.MAJOR) { keySig = KeySigFull.C_MAJOR }
        else if (note == KeySigNote.D && mode == KeySigMode.MAJOR) { keySig = KeySigFull.D_MAJOR }
        else if (note == KeySigNote.E && mode == KeySigMode.MAJOR) { keySig = KeySigFull.E_MAJOR }
        else if (note == KeySigNote.F && mode == KeySigMode.MAJOR) { keySig = KeySigFull.F_MAJOR }
        else if (note == KeySigNote.G && mode == KeySigMode.MAJOR) { keySig = KeySigFull.G_MAJOR }
        else if (note == KeySigNote.A && mode == KeySigMode.MAJOR) { keySig = KeySigFull.A_MAJOR }
        else if (note == KeySigNote.B && mode == KeySigMode.MAJOR) { keySig = KeySigFull.B_MAJOR }

        // natural root minor
        else if (note == KeySigNote.C && mode == KeySigMode.MINOR) { keySig = KeySigFull.C_MINOR }
        else if (note == KeySigNote.D && mode == KeySigMode.MINOR) { keySig = KeySigFull.D_MINOR }
        else if (note == KeySigNote.E && mode == KeySigMode.MINOR) { keySig = KeySigFull.E_MINOR }
        else if (note == KeySigNote.F && mode == KeySigMode.MINOR) { keySig = KeySigFull.F_MINOR }
        else if (note == KeySigNote.G && mode == KeySigMode.MINOR) { keySig = KeySigFull.G_MINOR }
        else if (note == KeySigNote.A && mode == KeySigMode.MINOR) { keySig = KeySigFull.A_MINOR }
        else if (note == KeySigNote.B && mode == KeySigMode.MINOR) { keySig = KeySigFull.B_MINOR }

        // sharp root major
        else if (note == KeySigNote.C_SHARP && mode == KeySigMode.MAJOR) { keySig = KeySigFull.C_SHARP_MAJOR }
        else if (note == KeySigNote.D_SHARP && mode == KeySigMode.MAJOR) { keySig = KeySigFull.D_SHARP_MAJOR }
        else if (note == KeySigNote.F_SHARP && mode == KeySigMode.MAJOR) { keySig = KeySigFull.F_SHARP_MAJOR }
        else if (note == KeySigNote.G_SHARP && mode == KeySigMode.MAJOR) { keySig = KeySigFull.G_SHARP_MAJOR }
        else if (note == KeySigNote.A_SHARP && mode == KeySigMode.MAJOR) { keySig = KeySigFull.A_SHARP_MAJOR }
        
        // sharp root minor
        else if (note == KeySigNote.C_SHARP && mode == KeySigMode.MINOR) { keySig = KeySigFull.C_SHARP_MINOR }
        else if (note == KeySigNote.D_SHARP && mode == KeySigMode.MINOR) { keySig = KeySigFull.D_SHARP_MINOR }
        else if (note == KeySigNote.F_SHARP && mode == KeySigMode.MINOR) { keySig = KeySigFull.F_SHARP_MINOR }
        else if (note == KeySigNote.G_SHARP && mode == KeySigMode.MINOR) { keySig = KeySigFull.G_SHARP_MINOR }
        else if (note == KeySigNote.A_SHARP && mode == KeySigMode.MINOR) { keySig = KeySigFull.A_SHARP_MINOR }

        // flat root major
        else if (note == KeySigNote.D_FLAT && mode == KeySigMode.MAJOR) { keySig = KeySigFull.D_FLAT_MAJOR }
        else if (note == KeySigNote.E_FLAT && mode == KeySigMode.MAJOR) { keySig = KeySigFull.E_FLAT_MAJOR }
        else if (note == KeySigNote.G_FLAT && mode == KeySigMode.MAJOR) { keySig = KeySigFull.G_FLAT_MAJOR }
        else if (note == KeySigNote.A_FLAT && mode == KeySigMode.MAJOR) { keySig = KeySigFull.A_FLAT_MAJOR }
        else if (note == KeySigNote.B_FLAT && mode == KeySigMode.MAJOR) { keySig = KeySigFull.B_FLAT_MAJOR }

        // flat root minor
        else if (note == KeySigNote.D_FLAT && mode == KeySigMode.MINOR) { keySig = KeySigFull.D_FLAT_MINOR }
        else if (note == KeySigNote.E_FLAT && mode == KeySigMode.MINOR) { keySig = KeySigFull.E_FLAT_MINOR }
        else if (note == KeySigNote.G_FLAT && mode == KeySigMode.MINOR) { keySig = KeySigFull.G_FLAT_MINOR }
        else if (note == KeySigNote.A_FLAT && mode == KeySigMode.MINOR) { keySig = KeySigFull.A_FLAT_MINOR }
        else { keySig = KeySigFull.B_FLAT_MINOR } 

        return keySig;
    }
}
