export default interface MidiObservable {
    onKeyboardChord(chord: Set<number>): void;
}