import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import MidiToSheetNote from "../../src/music_model/MidiToSheetNote"
import { KeySigNote, KeySigMode, Clef, NoteOnOff } from "../../src/music_model/Enums";
import MidiMessage from "../../src/keyboard_connection/MidiMessage";

describe('midi msg to sheet note converter', () => {

    it('note on', () => {
        let converter = new MidiToSheetNote(KeySigNote.C, KeySigMode.MINOR, Clef.TREBLE_CLEF);

        let noteOn = new MidiMessage(144, 60, 100);

        let sheetNote = converter.getSheetNote(noteOn)

        expect(sheetNote.getSheetNote()).toBe(-6);
        expect(sheetNote.getOnOrOff()).toBe(NoteOnOff.ON)
    })

    it('note off', () => {
        let converter = new MidiToSheetNote(KeySigNote.C, KeySigMode.MINOR, Clef.TREBLE_CLEF);

        let noteOff = new MidiMessage(144, 60, 0);

        let sheetNote = converter.getSheetNote(noteOff)

        expect(sheetNote.getSheetNote()).toBe(-6);
        expect(sheetNote.getOnOrOff()).toBe(NoteOnOff.OFF)
    })
})
