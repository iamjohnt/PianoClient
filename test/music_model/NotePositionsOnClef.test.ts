import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import NoteOffsetsFromClefCenter from "../../src/music_model/NotePositionsOnClef"
import { Clef } from "../../src/music_model/Enums";

describe('when treble clef and note is midi val 60', () => {
    it('should be offset of -6', () => {
        let offsets = new NoteOffsetsFromClefCenter(Clef.TREBLE_CLEF);
        let C4position = offsets.getPositionByNote(60)     
        expect(C4position).toBe(-6)
    })

});

describe('when bass clef and note is midi value 50 (D3, which is middle of bass clef)', () => {
    it('should be offset of 0', () => {
        let offsets = new NoteOffsetsFromClefCenter(Clef.BASS_CLEF);
        let d3offset = offsets.getPositionByNote(50)     
        expect(d3offset).toBe(0)
    })
});
