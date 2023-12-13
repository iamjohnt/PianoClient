import MidiMessage from "./MidiMessage";

export default interface MidiObservable {
    onUpdate(midiMessage: MidiMessage): void;
}