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
        expect(util.isWhiteKey(61)).toBe(false);
        expect(util.isWhiteKey(63)).toBe(false);
        expect(util.isWhiteKey(66)).toBe(false);
        expect(util.isWhiteKey(68)).toBe(false);
        expect(util.isWhiteKey(70)).toBe(false);
    })

    it('has edges A0 and C8', () => {
        let util: MusicUtil = new MusicUtil();
        expect(util.isWhiteKey(21)).toBe(true);
        expect(util.isWhiteKey(108)).toBe(true);
    })
});

