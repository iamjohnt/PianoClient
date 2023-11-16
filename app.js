import {connect, disconnect, sendHello, sendChord} from "/stomp/stomp.js"
import { connectMidi } from "/midi/midi.js";


connectMidi();

// jquery
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendChord());
});