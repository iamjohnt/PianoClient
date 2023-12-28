import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import KeySigAccidentalMap from "../../src/music_model/KeySigAccidentalMap"
import { Accidental, KeySigMode, KeySigNote } from "../../src/music_model/Enums";

/*
a major minor
b major minor
c
d
e
f
g

*/
describe('natural roots accidentals', () => {
    let map = new KeySigAccidentalMap();
    it('a major', () => {
        let acc = map.getAccidental(KeySigNote.A, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.SHARP)
    })
    it('a minor', () => {
        let acc = map.getAccidental(KeySigNote.A, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.SHARP)
    })

    it('b major', () => {
        let acc = map.getAccidental(KeySigNote.B, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.SHARP)
    })
    it('b minor', () => {
        let acc = map.getAccidental(KeySigNote.B, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.SHARP)
    })

    it('c major', () => {
        let acc = map.getAccidental(KeySigNote.C, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.FLAT)
    })
    it('c minor', () => {
        let acc = map.getAccidental(KeySigNote.C, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.FLAT)
    })

    it('d major', () => {
        let acc = map.getAccidental(KeySigNote.D, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.SHARP)
    })
    it('d minor', () => {
        let acc = map.getAccidental(KeySigNote.D, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.FLAT)
    })

    it('e major', () => {
        let acc = map.getAccidental(KeySigNote.E, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.SHARP)
    })
    it('e minor', () => {
        let acc = map.getAccidental(KeySigNote.E, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.SHARP)
    })

    it('f major', () => {
        let acc = map.getAccidental(KeySigNote.F, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.FLAT)
    })
    it('f minor', () => {
        let acc = map.getAccidental(KeySigNote.F, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.FLAT)
    })

    it('g major', () => {
        let acc = map.getAccidental(KeySigNote.G, KeySigMode.MAJOR);
        expect(acc).toBe(Accidental.SHARP)
    })
    it('g minor', () => {
        let acc = map.getAccidental(KeySigNote.G, KeySigMode.MINOR);
        expect(acc).toBe(Accidental.FLAT)
    })
})
