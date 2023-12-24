import {afterEach, beforeEach, describe, test, expect, it, vi, beforeAll} from "vitest";
import {KeySigNote, KeySigMode, Accidental} from "../../src/music_model/Enums"

import KeySignature from "../../src/music_model/KeySignature"


describe('when given a key signature', () => {
    it('c minor is flat', () => {

        let k = new KeySignature(KeySigNote.C, KeySigMode.MINOR);
        let acc = k.getAccidental();
        expect(acc).toBe(Accidental.FLAT)
    })

    it('b flat minor is flat', () => {

        let k = new KeySignature(KeySigNote.B_FLAT, KeySigMode.MINOR);
        let acc = k.getAccidental();
        expect(acc).toBe(Accidental.FLAT)
    })
});