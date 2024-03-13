import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import MidiToSheetNote from "../../src/music_model/MidiToSheetNote"
import { KeySigNote, KeySigMode, Clef, NoteOnOff } from "../../src/music_model/Enums";
import MidiMessage from "../../src/keyboard_connection/MidiMessage";
import { WhichHands } from "../../src/game/Enum";

describe('midi msg to sheet note converter RIGHT hand', () => {

    it('note on', () => {
        let converter = new MidiToSheetNote(KeySigNote.C, KeySigMode.MINOR, WhichHands.RIGHT);

        let noteOn = new MidiMessage(144, 60, 100);

        let sheetNote = converter.getSheetNote(noteOn)

        expect(sheetNote.getSheetNote()).toBe(-6);
        expect(sheetNote.getOnOrOff()).toBe(NoteOnOff.ON)
    })

    it('note off', () => {
        let converter = new MidiToSheetNote(KeySigNote.C, KeySigMode.MINOR, WhichHands.RIGHT);

        let noteOff = new MidiMessage(144, 60, 0);

        let sheetNote = converter.getSheetNote(noteOff)

        expect(sheetNote.getSheetNote()).toBe(-6);
        expect(sheetNote.getOnOrOff()).toBe(NoteOnOff.OFF)
    })
})

describe('midi msg to sheet note converter LEFT hand', () => {

    it('D3 midi val 50 note on', () => {
        let converter = new MidiToSheetNote(KeySigNote.C, KeySigMode.MINOR, WhichHands.LEFT);

        let noteOn = new MidiMessage(144, 50, 100);

        let sheetNote = converter.getSheetNote(noteOn)

        expect(sheetNote.getSheetNote()).toBe(0);
        expect(sheetNote.getOnOrOff()).toBe(NoteOnOff.ON)
    })

    it('D3 midi val 50 note off', () => {
        let converter = new MidiToSheetNote(KeySigNote.C, KeySigMode.MINOR, WhichHands.LEFT);

        let noteOff = new MidiMessage(144, 50, 0);

        let sheetNote = converter.getSheetNote(noteOff)

        expect(sheetNote.getSheetNote()).toBe(0);
        expect(sheetNote.getOnOrOff()).toBe(NoteOnOff.OFF)
    })
})