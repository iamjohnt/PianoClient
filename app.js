import {connect, disconnect, sendHello, sendChord} from "/stomp/stomp.js"
import {MidiConnection } from "/midi/midi.js";

let mc = new MidiConnection();
mc.connectMidi();

// jquery
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendChord());
});