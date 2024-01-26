import ObjectPositions from "../../ObjectPositions";
import PlayerNote from "./PlayerNote";

export default class Staff {

    private readonly STAFF_CENTER_Y = 700;
    private readonly INTERVAL_DIST = ObjectPositions.UNIT() / 2
    private readonly NOTE_COUNT = 17; // must be odd

    private positionToYMap: Map<number, number> = new Map<number, number>;
    private sheetNoteToYMap: Map<number, number> = new Map<number, number>;
    private sheetNoteToPositionMap: Map<number, number> = new Map<number, number>;

    constructor() {
        this.positionToYMap = this.initPositionToYMap();
        this.sheetNoteToYMap = this.initSheetNoteToYMap();
    }

    private sheetNoteToPosition = () => {

    }

    private initSheetNoteToYMap = () => {

        let yPositions: Map<number, number> = new Map()

        let key = 0 - ((this.NOTE_COUNT - 1) / 2) // center of 17 is 9. zero out the 9, and you get range of -8 to +8

        for (let i = key; i <= 8; i++) {
            let y = this.STAFF_CENTER_Y - (i * this.INTERVAL_DIST);
            yPositions.set(i, y)
        }
        return yPositions;
    }

    private initPositionToYMap = (): Map<number, number> => {

        let sprites: Map<number, number> = new Map<number, number>();
    
        let staffCenterPos = ObjectPositions.STAFF_CENTER_Y();
        let intervalDist = ObjectPositions.VERTICAL_GAP_TWEEN_NOTES();
        let noteCount = 17;
        let key = -8; // center of 17 is 9. zero out the 9, and you get range of -8 to +8
    
        for (let i = key; i <= 8; i++) {
            let y = staffCenterPos - (i * intervalDist);
        }
        return sprites;
    }

    
}