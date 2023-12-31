import { Accidental, NoteOnOff} from "./Enums";

export default class SheetNote {

    private accidental: Accidental;
    private sheetNote: number;
    private onOrOff: NoteOnOff;

    constructor(sheet_note: number, accidental: Accidental, onOrOff: NoteOnOff) {
        this.sheetNote = sheet_note;
        this.accidental = accidental;
        this.onOrOff = onOrOff;
    }

    public getSheetNote = () => {
        return this.sheetNote;
    }

    public getAccidental = () => {
        return this.accidental;
    }

    public getOnOrOff = (): NoteOnOff => {
        return this.onOrOff;
    }

}