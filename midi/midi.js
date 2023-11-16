function logMidi(message) {
    let timestamp = Date.now();
    let date = new Date(timestamp);
    console.info(
        date.getFullYear() + "/" +
        date.getMonth() + "/" +
        date.getDay() + " " + 
        date.getHours() + ":" +
        date.getMinutes() + ":" + 
        date.getSeconds() + ":" + 
        date.getMilliseconds() + " midi note value --- " + 
        message.data[1]
    );
}

function onMIDIMessage (message) {  
    let note = 1;
    let keyOnOrOff = 144;
    if (message.data[0] == keyOnOrOff) {
        logMidi(message);
    }
}

// inputs is an iterator. each time there is a midi message, call the onMIDIMessage function 
function success (midi) {
    var inputs = midi.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function failure () {
    console.error('No access to your midi devices.');
}

function connectMidi() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(success, failure);
    }
}

export {connectMidi};
