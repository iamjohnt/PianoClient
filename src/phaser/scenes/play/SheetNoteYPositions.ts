import SheetNote from "../../../music_model/SheetNote";
import ObjectPositions from "../../ObjectPositions";

export default class SheetNoteYPositions {

    private yPositions: Map<number, number> = new Map<number, number>;

    private readonly STAFF_CENTER_Y = 700;
    private readonly INTERVAL_DIST = ObjectPositions.UNIT() / 2
    private readonly NOTE_COUNT = 17; // must be odd

    constructor() {
        let key = 0 - ((this.NOTE_COUNT - 1) / 2) // center of 17 is 9. zero out the 9, and you get range of -8 to +8

        for (let i = key; i < 8; i++) {
            let y = this.STAFF_CENTER_Y - (i * this.INTERVAL_DIST);
            this.yPositions.set(i, y)
        }
    }

    public getYPosition = (sheetNote: SheetNote): number => {
        let note = sheetNote.getSheetNote();
        let val = this.yPositions.get(note);
        if (val == undefined) {
            console.error("SheetNoteYPositions: sheet note position does not exist in map: " + note.toString())
            return -12345
        } else {
            return val;
        }
    }
}