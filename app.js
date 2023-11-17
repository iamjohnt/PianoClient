import {StompConnection} from "/stomp/stomp.js"
import {MidiConnection } from "/midi/midi.js";

let mc = new MidiConnection();
mc.connectMidi();

let sc = new StompConnection();



// jquery
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => sc.connectStomp());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sc.sendHello());
});