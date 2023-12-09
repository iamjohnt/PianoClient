export class MidiConnection {

    onMIDIMessageHandler = (message: any) => {
        if (message.data[0] == 144 || message.data[1] == 128) {
            console.log("default midi message handler. please explicitly set one via setOnMIDIMessageHandler()");
            console.log(message);
        }
    }

    onConnectSuccess = (midi: any) => {
        console.info("connected");
        var inputs = midi.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessageHandler;
        }
    }
    
    onConnectFailure = () => {
        console.error('No access to your midi devices.');
    }
    
    connectMidiDevice = () => {
        console.info("connecting...")
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(this.onConnectSuccess, this.onConnectFailure);
        }
    }

    setOnMIDIMessageHandler = (newHandler: any) => {
        this.onMIDIMessageHandler = newHandler;
    }

}