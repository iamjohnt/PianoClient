import { ChordPool, KeySigMode, KeySigNote, WhichHands } from "../../game/Enum";
import { GameSettings } from "../../game/GameSettings";
import StompConnection from "../../stomp_connection/StompConnection";


export default class TestContainer extends Phaser.GameObjects.Container {

    private stompConnection: StompConnection;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);

        // connect to stomp
        this.createButton(0, 0, 'connect', () => {
            this.stompConnection = scene.game.registry.get('stompConnection');
            this.stompConnection.connectStomp();
        });
        
        // send test name and age
        this.createButton(0, 100, 'hello', () => {
            this.stompConnection.stompMethods.sendHello('john', '34');
        });
    
        // send game settings (which currently also creates a game session)
        this.createButton(0, 200, 'send settings', () => {

            let settings: GameSettings = new GameSettings()
                .setChordPool(ChordPool.NOTE)
                .setKeySigNote(KeySigNote.C)
                .setKeySigMode(KeySigMode.MAJOR)
                .setWhichHands(WhichHands.RIGHT)
                .setLeftMin(30)
                .setLeftMax(48)
                .setRightMin(50)
                .setRightMax(72)

            this.stompConnection.stompMethods.sendGameSettings(settings);
        });

        // start a game
        this.createButton(0, 300, 'start game', () => {
            this.stompConnection.stompMethods.startGame('starting game session');
        });
    }
  
    private createButton(x: number, y: number, text: string, callback: Function) {
        const button = this.scene.add.text(x, y, text, {
            backgroundColor: '#3498db',
            padding: { x: 30, y: 15 },
            fontSize: '36px',
        });
    
        button.setInteractive({ useHandCursor: true });
    
        button.on('pointerdown', () => {
            callback();
        });
    
        // Add the button to the container
        this.add(button);
        }
  }