import SheetNote from "./SheetNote"

/*
each note is the offset from the center of a clef
ex: 
    -2, 0, 2 on treble clef
    0 = center, which is B4
    2 = D
    -2 = G

this is done so that the UI code can take this, multiply the offset by the pixel distance between notes
*/
export default class SheetChord {

    private sheetNotes: Set<SheetNote>

    constructor() {
        this.sheetNotes = new Set();
    }

    public addNote = (sheetNote: SheetNote) => {
        this.sheetNotes.add(sheetNote);
    }

    public getSheetNotes = (): Set<SheetNote> => {
        return this.sheetNotes
    }
}