import MidiMessage from "./MidiMessage";
import MidiConnectionRelay from "./MidiMessageRelay";

export default class MidiConnection {

    private relay: MidiConnectionRelay | undefined;

    constructor(relay?: MidiConnectionRelay){
        this.relay = relay;
    }

    public onConnectSuccess = (midi: any) => {
        console.info("connected");
        var inputs = midi.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessageHandler;
        }
    }
    
    public onConnectFailure = () => {
        console.error('No access to your midi devices.');
    }
    
    public connectMidiDevice = () => {
        console.info("connecting...")
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(this.onConnectSuccess, this.onConnectFailure);
        }
    }

    public setMidiConnectionRelay(relay: MidiConnectionRelay) {
        this.relay = relay;
    }

    private onMIDIMessageHandler = (message: any) => {
        if (this.relay != undefined) {
            let status = message.data[0];
            let note = message.data[1];
            let velocity = message.data[2];
    
            let midiMsg: MidiMessage = new MidiMessage(status, note, velocity);
            this.relay.receiveMidiMessage(message);
        }
    }

}