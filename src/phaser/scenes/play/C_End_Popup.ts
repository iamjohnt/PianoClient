import { GameObjects } from "phaser";
import ObjectPositions from "../../ObjectPositions";

/**
This popup will appear when the game has ended.
User can press buttons to take certain actions after game ends.
*/
export default class C_PlayerNotePool extends GameObjects.Container {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        scene.add.existing(this);

        let center_x = ObjectPositions.WIDTH() / 2
        let center_y = ObjectPositions.HEIGHT() / 2

        this.assembleAndCreatePopup(center_x, center_y)
    }

    private assembleAndCreatePopup = (x: number, y: number) => {
        let popupWidth = 1200;
        let popupHeight = 800;

        let border = this.createRectangle(x, y, 1015, 615, 0x000000)
        let fill = this.createRectangle(x, y, 1000, 600, 0xFFFFFF)

        this.scene.add.text(x, y - 175, 'Finished!')
            .setFontSize(72)
            .setFill('#000')
            .setOrigin(0.5,0.5)

        this.createButton(x, y, 250, 100, 'Home')
            .on('pointerdown', this.goToWelcomeScene);

        this.createButton(x, y + 125, 250, 100, 'Replay?')
            .on('pointerdown', this.replayGame);
    }

    private goToWelcomeScene = () => {
        console.log('home')
    }

    private replayGame = () => {
        console.log('replay')
    }

    private createButton = (x: number, y: number, w: number, h: number, text: string) : Phaser.GameObjects.Text => {
        // button background
        this.createRectangle(x, y, w, h, 0x000000)

        return this.scene.add.text(x, y, text)
            .setFontSize(48)
            .setFill('#fff')
            .setOrigin(0.5,0.5)
            .setInteractive()
    }

    private createRectangle = (x: number, y: number, w: number, h: number, colorHexCode: number) : Phaser.GameObjects.Graphics=> {

        // get top left x,y from center x,y
        let leftX = this.calcLeftX(x, w)
        let topY = this.calcTopY(y, h)

        let graphics = this.scene.add.graphics();
        graphics.fillStyle(colorHexCode, 1);
        graphics.fillRoundedRect(leftX, topY, w, h, 16);

        return graphics;
    }

    private calcLeftX = (centerX: number, length: number) => {
        return centerX - length / 2
    }

    private calcTopY = (centerY: number, height: number) => {
        return centerY - height / 2
    }
}
