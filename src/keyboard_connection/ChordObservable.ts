export default interface MidiObservable {
    onUpdate(chord: Set<number>): void;
}