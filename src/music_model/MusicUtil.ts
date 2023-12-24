import { KeySigFull } from "./Enums";

export default class MusicUtil {

    public isWhiteKey = (midi_note: number) => {

        let A0 = 21;
        let C8 = 108;
        let whiteKeys: Set<number> = new Set();
        let a_minor_interavals: Array<number> = [2,1,2,2,1,2,2]

        let curNote = A0;
        let curInterval = 0;

        while (curNote <= C8) {
            whiteKeys.add(curNote);
            curNote += a_minor_interavals[curInterval];
            
            curInterval = (curInterval + 1) % a_minor_interavals.length;
        }

        return whiteKeys.has(midi_note);
    }

    public getWhiteNotes = (): Array<number> => {
        let rtn = new Array();

        let A0 = 21;
        let C8 = 108;
        let whiteKeys: Array<number> = new Array();
        let a_minor_interavals: Array<number> = [2,1,2,2,1,2,2]

        let curNote = A0;
        let curInterval = 0;

        while (curNote <= C8) {
            whiteKeys.push(curNote);
            curNote += a_minor_interavals[curInterval];
            
            curInterval = (curInterval + 1) % a_minor_interavals.length;
        }
        return whiteKeys;
    }

    public isBlackKey = (midi_note: number) => {

        let A0 = 21;
        let C8 = 108;
        let whiteKeys: Set<number> = new Set();
        let a_minor_interavals: Array<number> = [2,1,2,2,1,2,2]

        let curNote = A0;
        let curInterval = 0;

        while (curNote <= C8) {
            whiteKeys.add(curNote);
            curNote += a_minor_interavals[curInterval];
            
            curInterval = (curInterval + 1) % a_minor_interavals.length;
        }

        return !whiteKeys.has(midi_note);
    }




}