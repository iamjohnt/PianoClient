import { Countdown } from "./countdown.js";

let noteBuffer = new Set();
let thing = "thing";

let submitChord = () => {
    console.log("mock send cord to database");
    console.log(noteBuffer);
    noteBuffer.clear();
}

let countdown = new Countdown(submitChord);

let logMidi = (message) => {
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



function onMIDIMessage (message) {  
    if (message.data[0] == 144 && message.data[2] != 0) {
        logMidi(message);
        let noteValue = message.data[1];
        if (countdown.isActive == false) {
            countdown.startCountdown();
        } else {
            countdown.refreshCountdown();
        }
        noteBuffer.add(noteValue);

    }
}

// inputs is an iterator. each time there is a midi message, call the onMIDIMessage function 
function success (midi) {
    console.info("connected");
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function failure () {
    console.error('No access to your midi devices.');
}

function connectMidi() {
    console.info("connecting...")
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(success, failure);
    }
}

export {connectMidi};
