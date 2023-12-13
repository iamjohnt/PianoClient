import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import MidiObservable from "../../src/keyboard_connection/MidiObservable";
import MidiMessage from "../../src/keyboard_connection/MidiMessage";
import MidiConnectionRelay from "../../src/keyboard_connection/MidiMessageRelay";
import { exec } from "child_process";

class ConcreteObserver implements MidiObservable{
    public isUpdated: boolean = false;
    onUpdate(midiMessage: MidiMessage): void {
        this.isUpdated = true;
    }
}

let midiRelay: MidiConnectionRelay;
let midiMsg: MidiMessage;

beforeEach(() => {
    midiRelay = new MidiConnectionRelay();
    midiMsg = new MidiMessage(144, 60, 0);
})

describe('when observers are observing, and upon midi message', () => {

    it('if only one observer, it updates', () => {
        let o = new ConcreteObserver();
        midiRelay.addObserver(o);
        midiRelay.receiveMidiMessage(midiMsg);
        expect(o.isUpdated).toBe(true);
    })

    it('if two observers, both updates', () => {
        let o1 = new ConcreteObserver();
        let o2 = new ConcreteObserver();
        midiRelay.addObserver(o1);
        midiRelay.addObserver(o2);

        midiRelay.receiveMidiMessage(midiMsg);
        expect(o1.isUpdated).toBe(true);
        expect(o2.isUpdated).toBe(true);
    })

})


describe('when observers dont exist, and upon midi message', () => {

    it('nothing explodes', () => {
        midiRelay.receiveMidiMessage(midiMsg);
    })

})
