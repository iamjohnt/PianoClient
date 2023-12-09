import Phaser from 'phaser';
import config from './ui/config';
import GameScene from './ui/scenes/Game';
import { MidiConnection } from './midi/midi';
import { StompConnection } from './stomp/stomp';
import * as $ from "jquery";
import { GameSettings } from './game/gameSettings';
import { ChordBuffer } from './game/chordBuffer';

new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);

// non ui code
console.log("qwer");
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
    sc.sendHello("john", "5");
}

// jquery
$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).on("click", () => sc.connectStomp());
    $( "#disconnect" ).on("click", () => sc.disconnect());
    $( "#send" ).on("click", () => sc.sendHello("john", "5"));
    $( "#sendConfig" ).on("click", () => sc.sendGameSettings(new GameSettings()));
});
