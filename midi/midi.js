import { Countdown } from "./countdown.js";

class MidiConnection {
    noteBuffer = new Set();

    submitChord = () => {
        console.log("mock send cord to database");
        console.log(this.noteBuffer);
        this.noteBuffer.clear();
    }

    countDown = new Countdown(this.submitChord);

    logMidi = (message) => {
        let timestamp = Date.now();
        let date = new Date(timestamp);
        console.info(
            date.getFullYear() + "/" +
            date.getMonth() + "/" +
            date.getDay() + " " + 
            date.getHours() + ":" +
            date.getMinutes() + ":" + 
            date.getSeconds() + ":" + 
            date.getMilliseconds() + " midi data --- " + 
            message.data[0] + " " + 
            message.data[1] + " " + 
            message.data[2]
        );
    }

    onMIDIMessage = (message) => {  
        if (message.data[0] == 144 && message.data[2] != 0) {
            this.logMidi(message);
            let noteValue = message.data[1];
            if (this.countDown.isActive == false) {
                this.countDown.startCountdown();
            } else {
                this.countDown.refreshCountdown();
            }
            this.noteBuffer.add(noteValue);
        }
    }

    success = (midi) => {
        console.info("connected");
        var inputs = midi.inputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessage;
        }
    }
    
    failure = () => {
        console.error('No access to your midi devices.');
    }
    
    connectMidi = () => {
        console.info("connecting...")
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(this.success, this.failure);
        }
    }
}

export {MidiConnection};
