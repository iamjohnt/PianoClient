class MidiConnection {

    // logMidi = (message) => {
    //     let timestamp = Date.now();
    //     let date = new Date(timestamp);
    //     console.info(
    //         date.getFullYear() + "/" +
    //         date.getMonth() + "/" +
    //         date.getDay() + " " + 
    //         date.getHours() + ":" +
    //         date.getMinutes() + ":" + 
    //         date.getSeconds() + ":" + 
    //         date.getMilliseconds() + " midi data --- " + 
    //         message.data[0] + " " + 
    //         message.data[1] + " " + 
    //         message.data[2]
    //     );
    // }

    onMIDIMessageHandler = (message) => {
        if (message.data[0] == 144 || message.data[1] == 128) {
            console.log("default midi message handler. please explicitly set one via setOnMIDIMessageHandler()");
            console.log(message);
        }
    }

    onConnectSuccess = (midi) => {
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

    setOnMIDIMessageHandler = (newHandler) => {
        this.onMIDIMessageHandler = newHandler;
    }

}

export {MidiConnection};
