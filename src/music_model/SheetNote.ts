import { Accidental } from "./Enums";

export default class SheetNote {

    private accidental: Accidental;
    private sheetNote: number;

    constructor(sheet_note: number, accidental: Accidental) {
        this.sheetNote = sheet_note;
        this.accidental = accidental;
    }

    public getSheetNote = () => {
        return this.sheetNote;
    }

    public getAccidental = () => {
        return this.accidental;
    }

}