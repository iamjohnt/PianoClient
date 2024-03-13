import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";

import "../../../../src/phaser/scenes/play/SheetNoteYPositions"
import SheetNoteYPositions from "../../../../src/phaser/scenes/play/SheetNoteYPositions";
import SheetNote from "../../../../src/music_model/SheetNote";
import { Accidental, NoteOnOff } from "../../../../src/music_model/Enums";
import ObjectPositions from "../../../../src/phaser/ObjectPositions";


let yPos: SheetNoteYPositions;

beforeEach(() => {
    yPos = new SheetNoteYPositions();
});

afterEach(() => {
    let yPos = null;
});

describe('sheet note y positions', () => {
    
    it('center note', () => {
        let note = new SheetNote(0, Accidental.NATURAL, NoteOnOff.ON)
        let y = yPos.getYPosition(note);
        expect(y).toBe(0)
    })

    it('higher note', () => {
        let note = new SheetNote(1, Accidental.NATURAL, NoteOnOff.ON)
        let y = yPos.getYPosition(note);
        expect(y).toBe(-50)
    })
})
