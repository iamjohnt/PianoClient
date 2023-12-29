import ChordBuffer from "./ChordBuffer"
import MidiConnection from "./MidiConnection";
import MidiConnectionRelay from "./MidiMessageRelay";
import ChordObservable from "./ChordObservable";
import MidiObservable from "./MidiObservable";
import MidiMessage from "./MidiMessage";

export default class KeyboardConnection {

    private chordBuffer: ChordBuffer;
    private midiConnection: MidiConnection;
    private midiConnectionRelay: MidiConnectionRelay;
    private chordObservers: Array<ChordObservable> = new Array<ChordObservable>();
    private noteObservers: Array<MidiObservable> = new Array<MidiObservable>();

    constructor() {

        let onChordPrintIt = (chord: Set<number>): void => {
            this.chordObservers.forEach(
                (observer) => {
                    observer.onUpdate(chord);
                }
            )
        } 

        this.chordBuffer = new ChordBuffer(this.notifyObservers);
        this.midiConnection = new MidiConnection();
        this.midiConnectionRelay = new MidiConnectionRelay();

        // connect buffer -> relay -> midi_connection
        this.midiConnection.setMidiConnectionRelay(this.midiConnectionRelay);
        this.midiConnectionRelay.addObserver(this.chordBuffer);
        
    }

    public connectMidi = () => {
        this.midiConnection.connectMidiDevice();
    }

    public setOnConnectMidiSuccess = (newHandler: any) => {
        this.midiConnection.setOnConnectSuccess(newHandler);
    }

    public setOnConnectMidiFailure = (newHandler: any) => {
        this.midiConnection.setOnConnectFailure(newHandler);
    }

    public addObserver = (newObserver: ChordObservable) => {
        this.chordObservers.push(newObserver);
    }

    public removeObserver = (observer: ChordObservable) => {
        const index = this.chordObservers.indexOf(observer);
        if (index !== -1) {
          this.chordObservers.splice(index, 1);
        }
    }

    private notifyObservers = (chord: Set<number>) => {
        this.chordObservers.forEach(
            (observer) => {
                observer.onUpdate(chord);
            }
        )
    }

    public addNoteObserver = (observer: MidiObservable) => {
        this.midiConnectionRelay.addObserver(observer);
    }

    public removeNoteObserver = (observer: MidiObservable) => {
        this.midiConnectionRelay.removeObserver(observer);
    }

    // public disconnectMidi = () => {
    //     // set onmidimessage = undefined
    // }

    // public getMidiDevices = () => {
    //     // todo
    // }

}