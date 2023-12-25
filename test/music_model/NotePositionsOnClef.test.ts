import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import NoteOffsetsFromClefCenter from "../../src/music_model/NotePositionsOnClef"
import { Clef } from "../../src/music_model/Enums";

describe('', () => {
    it('', () => {
        let offsets = new NoteOffsetsFromClefCenter(Clef.TREBLE_CLEF);
        let C4position = offsets.getPositionByNote(60)     
        expect(C4position).toBe(-6)
    })

});

