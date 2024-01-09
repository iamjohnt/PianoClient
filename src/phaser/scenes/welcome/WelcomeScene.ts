import StompService from "../../../stomp_connection/StompService";
import GameContext from "../../GameContext";
import Pos from "../../ObjectPositions";

export default class GameScene extends Phaser.Scene{

    private context: GameContext;
    constructor() {
        super({ key: 'welcome' });
        this.context = new GameContext();
    }

    // public init = () => {}

    public preload = () => {
        this.load.image('logo', 'assets/logo.png')
        this.load.image('background', 'assets/background.png')
    };
    
    public create = () => {

        let logo = this.add.image(Pos.LOGO_CENTER_X(), Pos.LOGO_CENTER_Y(), 'logo').setOrigin(0.5, 0.5)

        let welcome_text = this.add.text(Pos.WELCOME_MSG_CENTER_X(), Pos.WELCOME_MSG_CENTER_Y(), 'click / tap anywhere to start')
            .setColor('black')
            .setFontSize(72)
            .setFontFamily('"Arial Black", sans-serif')
            .setOrigin(.5, .5)

        let click_anywhere_for_next_scene = this.add.sprite(0, 0, 'background')
            .setOrigin(0,0)
            .setAlpha(0.1)
            .setInteractive()
            .on('pointerdown', () => {
                let stompService = new StompService('ws://localhost:8081/ws');
                this.context.stompService = stompService;
                stompService.setOnConnect(frame => {
                    console.log(frame)
                    this.scene.start('settings', this.context)
                })
                stompService.connectStomp();
        });

    };


}