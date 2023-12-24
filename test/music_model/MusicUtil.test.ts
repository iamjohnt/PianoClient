import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import MusicUtil from "../../src/music_model/MusicUtil"

describe('when checking is a note is white or black key', () => {
    it('knows white keys from C4 - C7 are white keyes', () => {
        let util: MusicUtil = new MusicUtil();
        expect(util.isWhiteKey(60)).toBe(true);
        expect(util.isWhiteKey(62)).toBe(true);
        expect(util.isWhiteKey(64)).toBe(true);
        expect(util.isWhiteKey(65)).toBe(true);
        expect(util.isWhiteKey(67)).toBe(true);
        expect(util.isWhiteKey(69)).toBe(true);
        expect(util.isWhiteKey(71)).toBe(true);
        expect(util.isWhiteKey(72)).toBe(true);
    })

    it('knows black keys from C4 - C7 are black keyes', () => {
        let util: MusicUtil = new MusicUtil();
        expect(util.isBlackKey(61)).toBe(true);
        expect(util.isBlackKey(63)).toBe(true);
        expect(util.isBlackKey(66)).toBe(true);
        expect(util.isBlackKey(68)).toBe(true);
        expect(util.isBlackKey(70)).toBe(true);
    })

    it('has edges A0 and C8', () => {
        let util: MusicUtil = new MusicUtil();
        expect(util.isWhiteKey(21)).toBe(true);
        expect(util.isWhiteKey(108)).toBe(true);
    })
});

describe('when getting list of white notes', () => {
    it('has some white notes, does not have some black notes', () => {
        let util: MusicUtil = new MusicUtil();
        let whitenotes: Array<number> = util.getWhiteNotes();

        expect(whitenotes[0]).toBe(21);
        expect(whitenotes[1]).toBe(23);
        expect(whitenotes[2]).toBe(24);
        expect(whitenotes[3]).toBe(26);
        expect(whitenotes[4]).toBe(28);
        expect(whitenotes[5]).toBe(29);
        expect(whitenotes[6]).toBe(31);
        expect(whitenotes[7]).toBe(33);

        expect(whitenotes[whitenotes.length - 1]).toBe(108);


    })

});
