function onMIDIMessage (message) {  
    let note = 1;
    let keyOnOrOff = 144;
    if (message.data[0] == keyOnOrOff) {
        console.info(message);
        console.info(message.data[note]);
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
