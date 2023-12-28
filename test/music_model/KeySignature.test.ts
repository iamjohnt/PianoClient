import {afterEach, beforeEach, describe, test, expect, it, vi, beforeAll} from "vitest";
import {KeySigNote, KeySigMode, Accidental} from "../../src/music_model/Enums"

import KeySignature from "../../src/music_model/KeySignature"


describe('c minor', () => {
    it('accidental = flat', () => {

        let k = new KeySignature(KeySigNote.C, KeySigMode.MINOR);
        let acc = k.getAccidental();
        expect(acc).toBe(Accidental.FLAT)
    })

    it('64 is NOT chromatic', () => {
        let k = new KeySignature(KeySigNote.B_FLAT, KeySigMode.MINOR);
        let res = k.isChromatic(64);
        expect(res).toBe(false)
    })

});


describe('b flat minor', () => {
    it('accidental = flat', () => {
        let k = new KeySignature(KeySigNote.B_FLAT, KeySigMode.MINOR);
        let acc = k.getAccidental();
        expect(acc).toBe(Accidental.FLAT)
    })


    it('60 is NOT chromatic', () => {
        let k = new KeySignature(KeySigNote.B_FLAT, KeySigMode.MINOR);
        let res = k.isChromatic(59);
        expect(res).toBe(false)
    })
});