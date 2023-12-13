import ChordBuffer from "./ChordBuffer"
import MidiConnection from "./MidiConnection";
import MidiConnectionRelay from "./MidiMessageRelay";

export default class KeyboardConnection {

    private chordBuffer: ChordBuffer;
    private midiConnection: MidiConnection;
    private midiConnectionRelay: MidiConnectionRelay;

    constructor(onChord: (chord: Set<number>) => void) {

        this.chordBuffer = new ChordBuffer(onChord);
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

    // public disconnectMidi = () => {
    //     // set onmidimessage = undefined
    // }

    // public getMidiDevices = () => {
    //     // todo
    // }

}