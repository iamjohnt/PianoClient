import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import ChromaticNotes from "../../src/music_model/ChromaticNotes"
import { KeySigMode, KeySigNote } from "../../src/music_model/Enums";

describe('c major', () => {

    let cmajor = new ChromaticNotes(KeySigNote.C, KeySigMode.MAJOR);

    it('white keyes are chromatic', () => {
    
        expect(cmajor.isChromatic(60)).toBe(true);
        expect(cmajor.isChromatic(62)).toBe(true);
        expect(cmajor.isChromatic(64)).toBe(true);
        expect(cmajor.isChromatic(65)).toBe(true);
        expect(cmajor.isChromatic(67)).toBe(true);
        expect(cmajor.isChromatic(69)).toBe(true);
        expect(cmajor.isChromatic(71)).toBe(true);
        expect(cmajor.isChromatic(72)).toBe(true);

    })

    it('black keyes are not chromatic', () => {
        expect(cmajor.isChromatic(61)).toBe(false);
        expect(cmajor.isChromatic(63)).toBe(false);
        expect(cmajor.isChromatic(66)).toBe(false);
        expect(cmajor.isChromatic(68)).toBe(false);
        expect(cmajor.isChromatic(70)).toBe(false);
    })
});

describe('c minor', () => {

    let cmajor = new ChromaticNotes(KeySigNote.C, KeySigMode.MINOR);

    it('chromatic are chromatic', () => {
    
        expect(cmajor.isChromatic(60)).toBe(true);
        expect(cmajor.isChromatic(62)).toBe(true);
        expect(cmajor.isChromatic(63)).toBe(true);
        expect(cmajor.isChromatic(65)).toBe(true);
        expect(cmajor.isChromatic(67)).toBe(true);
        expect(cmajor.isChromatic(68)).toBe(true);
        expect(cmajor.isChromatic(70)).toBe(true);
        expect(cmajor.isChromatic(72)).toBe(true);

    })

    it('non chromatic is non chromatic', () => {
        expect(cmajor.isChromatic(61)).toBe(false);
        expect(cmajor.isChromatic(64)).toBe(false);
        expect(cmajor.isChromatic(66)).toBe(false);
        expect(cmajor.isChromatic(69)).toBe(false);
        expect(cmajor.isChromatic(71)).toBe(false);
    })
});

describe('out of bounds argument', () => {

    let cmajor = new ChromaticNotes(KeySigNote.C, KeySigMode.MINOR);

    it('when note is 20, which is not on scale', () => {
        expect(cmajor.isChromatic(20)).toBe(false);
    })

    it('when note is 109, which is not on scale', () => {
        expect(cmajor.isChromatic(109)).toBe(false);
    })
});