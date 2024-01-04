import ObjectPositions from "../../ObjectPositions";

export default class GameScene extends Phaser.Scene{


    private pos: ObjectPositions;


    constructor() {
        super({ key: 'welcome' });
        this.pos = new ObjectPositions();
    }

    // public init = () => {}

    public preload = () => {
        this.load.image('logo', 'assets/logo.png')
        this.load.image('background', 'assets/background.png')
    };
    
    public create = () => {

        let logo = this.add.image(this.pos.LOGO_CENTER_X, this.pos.LOGO_CENTER_Y, 'logo').setOrigin(0.5, 0.5)

        let welcome_text = this.add.text(this.pos.WIDTH / 2, this.pos.HEIGHT * (7/8), 'click / tap anywhere to start')
            .setColor('black')
            .setFontSize(72)
            .setFontFamily('"Arial Black", sans-serif')
            .setOrigin(.5, .5)

        let click_anywhere_for_next_scene = this.add.sprite(0, 0, 'background')
            .setOrigin(0,0)
            .setAlpha(0.1)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('clicked')
                this.scene.start('settings')
        });

    };

    public update = () => {

    } 

}