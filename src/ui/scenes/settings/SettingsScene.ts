import { GameSettings } from "../../../game/GameSettings";
import GameSceneContext from "../GameSceneContext";
import ObjectPositions from "../ObjectPositions";

export default class SettingsScene extends Phaser.Scene{


    private pos: ObjectPositions;

    constructor() {
        super({ key: 'settings' });
        this.pos = new ObjectPositions();
    }

    // public init = () => {}

    public preload = () => {

    };
    
    public create = () => {

        let welcome_text = this.add.text(this.pos.WIDTH / 2, this.pos.HEIGHT * .5, ':)')
            .setColor('black')
            .setFontSize(72)
            .setFontFamily('"Arial Black", sans-serif')
            .setOrigin(.5, .5)

    };

    public update = () => {

    } 

}