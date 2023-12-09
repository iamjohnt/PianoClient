import Phaser from 'phaser';
import config from './ui/config';
import GameScene from './ui/scenes/Game';
import { MidiConnection } from './midi/midi';

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
