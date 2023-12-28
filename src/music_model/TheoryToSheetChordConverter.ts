import TheoryChord from "./TheoryChord";
import BlackWhiteKeys from "./BlackWhiteKeys";
import KeySignature from "./KeySignature";
import { Accidental, Clef, KeySigMode, KeySigNote } from "./Enums";
import SheetNote from "./SheetNote"
import SheetChord from "./SheetChord"
import NotePositionsOnClef from "./NotePositionsOnClef";

export default class TheoryToSheetChordConverter {

    private keySig: KeySignature;
    private util: BlackWhiteKeys;
    private offsetsFromCenterMap: NotePositionsOnClef;
    
    constructor(note: KeySigNote, mode: KeySigMode, clef: Clef) {
        this.keySig = new KeySignature(note, mode);
        this.util = new BlackWhiteKeys();
        this.offsetsFromCenterMap = new NotePositionsOnClef(clef);
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

            let adjustedNote = note + 1;
            let posFromCenter = this.offsetsFromCenterMap.getPositionByNote(adjustedNote);
            return new SheetNote(posFromCenter, Accidental.FLAT);
        } 
        else {
            let adjustedNote = note - 1;
            let posFromCenter = this.offsetsFromCenterMap.getPositionByNote(adjustedNote);
            return new SheetNote(note - 1, Accidental.SHARP);
        }
    }

    private getWhiteKeySheetNote = (note: number) => {
        let posFromCenter = this.offsetsFromCenterMap.getPositionByNote(note);
        return new SheetNote(note, Accidental.NATURAL)
    }



}