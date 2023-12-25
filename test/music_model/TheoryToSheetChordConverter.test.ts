import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import TheoryChord from "../../src/music_model/TheoryChord";
import SheetChord from "../../src/music_model/SheetChord";
import TheoryToSheetChordConverter from "../../src/music_model/TheoryToSheetChordConverter"
import KeySignature from "../../src/music_model/KeySignature";
import {Clef, KeySigFull, KeySigNote, KeySigMode, Accidental} from "../../src/music_model/Enums"
import SheetNote from "../../src/music_model/SheetNote";

describe('', () => {
    it('', () => {
        let keysig = new KeySignature(KeySigNote.C, KeySigMode.MINOR);
        
        let converter = new TheoryToSheetChordConverter(keysig, Clef.TREBLE_CLEF);

        let e_flat = new TheoryChord(63);

        let sheetChord: SheetChord = converter.convertTheoryToSheetChord(e_flat);

        let thing: Set<SheetNote> = sheetChord.getSheetNotes();

        thing.forEach( (sheetNote: SheetNote) => { 
            expect(sheetNote.getAccidental()).toBe(Accidental.FLAT)
        });
    })
});