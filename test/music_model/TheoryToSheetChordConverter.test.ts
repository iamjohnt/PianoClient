import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import TheoryChord from "../../src/music_model/TheoryChord";
import SheetChord from "../../src/music_model/SheetChord";
import TheoryToSheetChordConverter from "../../src/music_model/TheoryToSheetChordConverter"
import KeySignature from "../../src/music_model/KeySignature";
import {Clef, KeySigFull, KeySigNote, KeySigMode, Accidental} from "../../src/music_model/Enums"
import SheetNote from "../../src/music_model/SheetNote";

describe('when c minor', () => {
    it('accidental = flat and adjusted note is 4 intervals below B4 - so E4 FLAT', () => {        
        let converter = new TheoryToSheetChordConverter(KeySigNote.C, KeySigMode.MINOR, Clef.TREBLE_CLEF);

        let e_flat_note = new TheoryChord(63);

        let sheetChord: SheetChord = converter.convertTheoryToSheetChord(e_flat_note);

        let thing: Set<SheetNote> = sheetChord.getSheetNotes();

        thing.forEach( (sheetNote: SheetNote) => { 
            expect(sheetNote.getAccidental()).toBe(Accidental.FLAT)
            expect(sheetNote.getSheetNote()).toBe(-4)
        });
    })
});