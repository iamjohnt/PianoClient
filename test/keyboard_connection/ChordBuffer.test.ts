import {afterEach, beforeEach, describe, test, expect, it, vi} from "vitest";
import MidiObservable from "../../src/keyboard_connection/MidiObservable";
import MidiMessage from "../../src/keyboard_connection/MidiMessage";
import MidiConnectionRelay from "../../src/keyboard_connection/MidiMessageRelay";
import ChordBuffer from "../../src/keyboard_connection/ChordBuffer";

let mockOnChordReady = vi.fn((chord: Set<number>) => console.log("mock"));
let relay: MidiConnectionRelay;
let midiMsg: MidiMessage;
let buffer: ChordBuffer;

beforeEach(() => {
    vi.useFakeTimers();
    relay = new MidiConnectionRelay();
})

afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
})

describe('when single note received, and timer done', () => {

    it('mock should execute once, when done', () => {
        let buffer = new ChordBuffer(mockOnChordReady);
        relay.addObserver(buffer);
        relay.receiveMidiMessage(new MidiMessage(144, 60, 1));
        vi.runAllTimers();
        expect(mockOnChordReady).toHaveBeenCalledOnce();
    })

    it('mock should execute once, at exact buffer time limit ', () => {
        let buffer = new ChordBuffer(mockOnChordReady);
        relay.addObserver(buffer);
        relay.receiveMidiMessage(new MidiMessage(144, 60, 1));
        vi.advanceTimersByTime(buffer.MS_TILL_BUFFER_FLUSH);
        expect(mockOnChordReady).toHaveBeenCalledOnce();
    })

})

describe('when single note received, but timer NOT done yet', () => {

    it('mock should NOT execute after only half time limit has passed', () => {
        let buffer = new ChordBuffer(mockOnChordReady);
        relay.addObserver(buffer);
        relay.receiveMidiMessage(new MidiMessage(144, 60, 1));
        vi.advanceTimersByTime(buffer.MS_TILL_BUFFER_FLUSH - (buffer.MS_TILL_BUFFER_FLUSH / 2));
        expect(mockOnChordReady).toHaveBeenCalledTimes(0);
    })

    it('mock should NOT execute after 1 ms below the time limit has passed', () => {
        let buffer = new ChordBuffer(mockOnChordReady);
        relay.addObserver(buffer);
        relay.receiveMidiMessage(new MidiMessage(144, 60, 1));
        vi.advanceTimersByTime(buffer.MS_TILL_BUFFER_FLUSH - 1);
        expect(mockOnChordReady).toHaveBeenCalledTimes(0);
    })


})

describe('when 2 notes received before timer finishes, and then timer finishes', () => {

    let myChord: Set<number>;
    let getChord = (chord: Set<number>): void => {
        myChord = chord;
    }

    it('the 2 notes should be bundled together as one chord', () => {
        let buffer = new ChordBuffer(getChord);
        relay.addObserver(buffer);
        relay.receiveMidiMessage(new MidiMessage(144, 60, 1));
        relay.receiveMidiMessage(new MidiMessage(144, 62, 1));
        vi.runAllTimers();
        expect(myChord.has(60) && myChord.has(62)).toBe(true);
    })

    it('the 2 notes should be bundled together as one chord, when midi message is recieved barely before time limite both times', () => {
        let buffer = new ChordBuffer(getChord);
        relay.addObserver(buffer);
        relay.receiveMidiMessage(new MidiMessage(144, 60, 1));
        vi.advanceTimersByTime(buffer.MS_TILL_BUFFER_FLUSH - 1);

        relay.receiveMidiMessage(new MidiMessage(144, 62, 1));
        vi.advanceTimersByTime(buffer.MS_TILL_BUFFER_FLUSH - 1);
        expect(myChord.has(60) && myChord.has(62)).toBe(true);
    })


})
