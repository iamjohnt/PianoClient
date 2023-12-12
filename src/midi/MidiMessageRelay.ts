import MidiMessage from "./MidiMessage";
import MidiObservable from "./MidiObservable";

/*
this relay exists, to decouple observer pattern logic from connection logic in MidiConnection
previously, they were together. now, unit tests can simulate new midi messages, without a real MidiConnection
*/
export default class MidiConnectionRelay {

    private observers: Array<MidiObservable>;

    constructor() {}

    public addObserver = (newObserver: MidiObservable) => {
        this.observers.push(newObserver);
    }

    public removeObserver = (observer: MidiObservable) => {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          this.observers.splice(index, 1);
        }
    }

    public receiveMidiMessage = (midiMsg: MidiMessage): void => {
        if (midiMsg.isNoteOn() || midiMsg.isNoteOff()) {
            this.notifyObservers(midiMsg);
        }
    }

    private notifyObservers = (midiMsg: MidiMessage) => {
        this.observers.forEach(
            (observer) => {
                observer.onUpdate(midiMsg);
            }
        )
    }

}