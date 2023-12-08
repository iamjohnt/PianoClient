import {StompConnection} from "/stomp/stomp.js";
import {MidiConnection } from "/midi/midi.js";
import {ChordBuffer} from "/game/chordBuffer.js";
import { GameSettings } from "/game/gameSettings.js";

let mc = new MidiConnection();
let sc = new StompConnection();
let chordBuffer = new ChordBuffer();


mc.setOnMIDIMessageHandler(
    chordBuffer.addNoteToChord
);

mc.connectMidiDevice();

chordBuffer.setOnChordReady(
    sc.sendChord
);

let dummySendSettings = () => {
    let settings = new GameSettings();
    sc.sendHello();
}

// jquery
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => sc.connectStomp());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sc.sendHello());
    $( "#sendConfig" ).click(() => sc.sendGameSettings(new GameSettings()));
});