import {StompConnection} from "/stomp/stomp.js";
import {MidiConnection } from "/midi/midi.js";
import {Game} from "/game/game.js";

let mc = new MidiConnection();
let game = new Game();


mc.setOnMIDIMessageHandler(
    game.addNoteToChord
);

mc.connectMidiDevice();


// jquery
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => sc.connectStomp());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sc.sendHello());
});