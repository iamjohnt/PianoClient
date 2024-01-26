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

    public getTopPosition = (): number => {
        let curTop = -999999;
        this.sheetNotes.forEach(note => {
            if (note.getSheetNote() > curTop) {
                curTop = note.getSheetNote()
            }
        })
        return curTop;
    }

    public getBottomPosition = (): number => {
        let curBot = 999999;
        this.sheetNotes.forEach(note => {
            if (note.getSheetNote() < curBot) {
                curBot = note.getSheetNote()
            }
        })
        return curBot;
    }

    public getTopSheetNote = (): SheetNote => {
        let curTop = -999999;
        let rtn!: SheetNote;
        this.sheetNotes.forEach(note => {
            if (note.getSheetNote() > curTop) {
                rtn = note
            }
        })
        return rtn;
    }

    public getBottomSheetNote = (): SheetNote => {
        let curBot = 9999999;
        let rtn!: SheetNote;
        this.sheetNotes.forEach(note => {
            if (note.getSheetNote() < curBot) {
                rtn = note;
            }
        })
        return rtn;
    }
}