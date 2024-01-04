import Phaser from 'phaser';
import config from './phaser/config';
import PlayScene from './phaser/scenes/play/PlayScene';
import StompConnection from './stomp_connection/StompConnection';
import J from "jquery";
import { GameSettings } from './game/GameSettings';
import KeyboardConnection from './keyboard_connection/KeyboardConnection';
import ChordObservable from "./keyboard_connection/ChordObservable";
import StompMethods from './stomp_connection/StompMethods';
import KeyboardToServerCommunicationInterface from './stomp_connection/KeyboardToServerInterface';
import { ChordPool, KeySigNote, KeySigMode, WhichHands } from './game/Enum';
import WelcomeScene from './phaser/scenes/welcome/WelcomeScene'
import SettingsScene from './phaser/scenes/settings/SettingsScene';

/*
// setup dumy game settings
let settings: GameSettings = new GameSettings()
  .setChordPool(ChordPool.NOTE)
  .setKeySigNote(KeySigNote.C)
  .setKeySigMode(KeySigMode.MAJOR)
  .setWhichHands(WhichHands.RIGHT)
  .setLeftMin(30)
  .setLeftMax(48)
  .setRightMin(50)
  .setRightMax(72)


// setup keyboard connection
let keyboard = new KeyboardConnection();
keyboard.connectMidi();


// setup stomp connection
let sc: StompConnection = new StompConnection('ws://localhost:8081/ws');

// connect keyboard -> stomp
class chordObserver implements ChordObservable {
  onUpdate(chord: Set<number>): void {
      sc.stompMethods.sendChord(chord);
      console.log(chord);
  }
}
keyboard.addObserver(new chordObserver);

// phaser setup and start
const game: Phaser.Game = new Phaser.Game(
  Object.assign(config, {
    scene: [GameScene]
  })
);


let gameSceneContext: GameSceneContext = new GameSceneContext(settings);

// have game scene context listen for chord sequences
game.registry.set('stompConnection', sc);
sc.chordSequenceHandler = gameSceneContext;

game.registry.set('stompConnection', sc);

// connect keyboard -> phaser
keyboard.addNoteObserver(gameSceneContext)

game.scene.start('Game', gameSceneContext)

*/


// // assign methods to buttons
// J(function () {
//     J("form").on('submit', (e) => e.preventDefault());

//     J( "#connect" ).on("click", () => {
//       sc.connectStomp(); 
//       sm.setStompClient(sc.getStompClient());
//     });

//     J( "#send" ).on("click", () => sm.sendHello("john", "5"));
    
//     J( "#sendConfig" ).on("click", () => sm.sendGameSettings(settings));
// });
class GameFlow {

    private game: Phaser.Game;

    constructor() {
        let keyboard = new KeyboardConnection();
        let stomp = new StompConnection('ws://localhost:8081/ws');

        this.game = new Phaser.Game(
            Object.assign(config, {
                scene: [WelcomeScene, SettingsScene, PlayScene]
            })
        );

        this.game.registry.set('keyboard', keyboard);
        this.game.registry.set('stomp', stomp);
    }
    
    public start = () => [
        this.game.scene.start('WelcomeScene')
    ]
}

const gameFlow = new GameFlow();

gameFlow.start()