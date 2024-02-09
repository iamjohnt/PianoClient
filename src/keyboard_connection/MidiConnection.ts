import MidiMessage from "./MidiMessage";
import MidiConnectionRelay from "./MidiMessageRelay";

export default class MidiConnection {

    private relay: MidiConnectionRelay | undefined;
    private onConnectSuccess: (inputDevices: Array<MIDIInput>) => void
    private onConnectFailure: (error: any) => void

    constructor(relay?: MidiConnectionRelay){
        this.relay = relay;
        this.onConnectSuccess = (inputDevices: Array<MIDIInput>) => console.log(inputDevices);
        this.onConnectFailure = (error) => console.log(error);
    }

    public connectMidiDevice = async () => {
        try {
            // get connected midi devices
            const midiAccess: MIDIAccess = await navigator.requestMIDIAccess();
            const inputs: IterableIterator<MIDIInput> = midiAccess.inputs.values();
            const inputDevices: Array<MIDIInput> = Array.from(inputs);
        
            // fail if none detected, otherwise listen for midi messages
            if (inputDevices.length === 0) {
                this.onConnectFailure('No connected midi devices');
            } else {
                inputDevices.forEach((device) => {
                    if (device.name && device.manufacturer) {
                        console.log(device.name + " " + device.manufacturer);
                    }
                    device.onmidimessage = this.onMIDIMessageHandler
                })
                this.onConnectSuccess(inputDevices)
            }
        } catch (error) {
            console.error('Error accessing MIDI:', error);
            this.onConnectFailure(error);
        }
    }

    public setMidiConnectionRelay(relay: MidiConnectionRelay) {
        this.relay = relay;
    }

    public setOnConnectSuccess = (newHandler: (inputDevices: Array<MIDIInput>) => void) => {
        this.onConnectSuccess = newHandler;
    } 

    public setOnConnectFailure = (newHandler: (error: any) => void) => {
        this.onConnectFailure = newHandler;
    } 

    private onMIDIMessageHandler = (message: any) => {
        if (this.relay != undefined) {
            let status = message.data[0];
            let note = message.data[1];
            let velocity = message.data[2];
    
            let midiMsg: MidiMessage = new MidiMessage(status, note, velocity);
            this.relay.receiveMidiMessage(midiMsg);
        }
    }

}