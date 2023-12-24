import TheoryChord from "./TheoryChord";
import MusicUtil from "./MusicUtil";
import KeySignature from "./KeySignature";
import { Accidental, KeySigFull } from "./Enums";
import SheetNote from "./SheetNote"
import SheetChord from "./SheetChord"

export default class TheoryToSheetChordConverter {

    private keySig: KeySignature;
    private util: MusicUtil;
    
    constructor(keySig: KeySignature) {
        this.keySig = keySig;
        this.util = new MusicUtil();
    }

    public convertTheoryToSheetChord = (theoryChord: TheoryChord): SheetChord => {

        let theoryNotes: Set<number> = theoryChord.getChord();
        let sheetChord: SheetChord = new SheetChord();

        theoryNotes.forEach((curNote) => {
            let sheetNote: SheetNote = this.getSheetNote(curNote);
            sheetChord.addNote(sheetNote);
        });
        
        return sheetChord;

    }

    private getSheetNote = (note: number): SheetNote => {
        if (this.util.isBlackKey(note)) {
            return this.getBlackKeySheetNote(note)
        } 
        else {
            return this.getWhiteKeySheetNote(note);
        }
    }

    private getBlackKeySheetNote = (note: number): SheetNote => {
        if (this.keySig.getAccidental() == Accidental.FLAT) {
            return new SheetNote(note + 1, Accidental.FLAT);
        } 
        else {
            return new SheetNote(note - 1, Accidental.SHARP);
        }
    }

    private getWhiteKeySheetNote = (note: number) => {
        return new SheetNote(note, Accidental.NATURAL)
    }



}