import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import TheoryChord from "../../src/music_model/TheoryChord"

describe('when create new TheoryChord', () => {
    it('is created successfully', () => {
        let myChord: TheoryChord = new TheoryChord(1,2,3);
        let extracted: Set<number> = myChord.getChord();
        expect(extracted.has(1)).toBeTruthy();
        expect(extracted.has(2)).toBeTruthy();
        expect(extracted.has(3)).toBeTruthy();
    })
});