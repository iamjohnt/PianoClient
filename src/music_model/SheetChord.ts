import SheetNote from "./SheetNote"

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