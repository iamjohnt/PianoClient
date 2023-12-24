import { Clef } from "./Enums";
import MusicUtil from "./MusicUtil";

export default class NotePositionsFromClefCenter {

    private readonly D3 = 48;
    private readonly B4 = 71;
    private center: number;
    private centerIndex: number;
    private whiteKeys: Array<number>

    private map: Map<number, number>;

    constructor(clef: Clef) {
        if (clef == Clef.BASS_CLEF) {
            this.center = this.D3;
        } else {
            this.center = this.B4;
        }
        this.whiteKeys = new MusicUtil().getWhiteNotes();
        this.centerIndex = this.getIndexOfNote(this.center, this.whiteKeys);
    }

    public populateMap = () => {
        let pos = 0;
        for (let i = this.centerIndex; i < this.whiteKeys.length; i++ ) {
            this.map.set(this.whiteKeys[i], pos)
            pos++;
        }

        pos = 0;
        for (let i = this.centerIndex; i >= this.whiteKeys.length; i-- ) {
            this.map.set(this.whiteKeys[i], pos)
            pos--;
        }
    }

    private getIndexOfNote = (note: number, array: Array<number>): number => {
        let rtn = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] == note) {
                rtn = i;
            }
        }
        return rtn;
    }

    public getPositionByNote = (note: number): number  => {
        let result = this.map.get(note);
        return result == undefined ? -12345 : result;
    }
    
}