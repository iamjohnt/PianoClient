import MidiMessage from "./MidiMessage.js";
import MidiObservable from "./MidiObservable.js";
import CountdownV2 from "./CountdownV2.js";

export default class ChordBuffer implements MidiObservable{

    public readonly MS_TILL_BUFFER_FLUSH: number = 100;
    private chord: Set<number>;
    private countdown: CountdownV2;

    constructor() {
        this.chord = new Set();
    }

    public setWhenChordReadyHandler = (whenChordReadyHandler: (chord: Set<number>) => void) => {
        let onCountdownDone = () => {
            whenChordReadyHandler(this.chord);
            this.chord.clear();
        }
        
        this.countdown = new CountdownV2(onCountdownDone, this.MS_TILL_BUFFER_FLUSH);
    }

    public onUpdate(midiMessage: MidiMessage) {
        if (midiMessage.isNoteOn()) {
            this.countdown.startOrRestartCountdown();
            this.chord.add(midiMessage.getNote());
        }
    }

}