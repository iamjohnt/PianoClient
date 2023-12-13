import Phaser from 'phaser';
import config from './ui/config';
import GameScene from './ui/scenes/Game';
import { MidiConnection } from './keyboard_connection/midi';
import { StompConnection } from './stomp/stomp';
import J from "jquery";
import { GameSettings } from './game/gameSettings';
import { ChordBuffer } from './keyboard_connection/ChordBuffer';

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
J(function () {
    J("form").on('submit', (e) => e.preventDefault());
    J( "#connect" ).on("click", () => sc.connectStomp());
    J( "#disconnect" ).on("click", () => sc.disconnect());
    J( "#send" ).on("click", () => sc.sendHello("john", "5"));
    J( "#sendConfig" ).on("click", () => sc.sendGameSettings(new GameSettings()));
});
