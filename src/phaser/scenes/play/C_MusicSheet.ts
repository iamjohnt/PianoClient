import { GameObjects } from "phaser";
import ObjectPositions from "../../ObjectPositions";
import { WhichHands } from "../../../music_model/Enums";

export default class C_MusicSheet extends GameObjects.Container{

    private readonly clef_texture_name: string = 'clef'
    private readonly staff_texture_name = 'staff'

    constructor(scene: Phaser.Scene, x: number, y: number, hand: WhichHands) {
        super(scene, x, y)
        scene.add.existing(this);

        let staff_image = this.scene.add.image(0, 0, this.staff_texture_name).setOrigin(0, .5)
        this.add(staff_image);

        if (hand == WhichHands.RIGHT) {
            let clef_image = this.scene.add.image(ObjectPositions.UNIT() * 2, ObjectPositions.UNIT() / 5, this.clef_texture_name).setOrigin(.5, .5)
            this.add(clef_image);
        } else if (hand == WhichHands.LEFT) {
            let clef_image = this.scene.add.image(ObjectPositions.UNIT() * 2, 0 - ObjectPositions.UNIT() * .4, this.clef_texture_name).setOrigin(.5, .5)
            this.add(clef_image);
        }
    }

}