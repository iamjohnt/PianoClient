import { GameObjects } from "phaser";
import ObjectPositions from "../../ObjectPositions";
import { WhichHands } from "../../../music_model/Enums";

/*
This container represents a 'Music Sheet'. A separate container holding notes and related visual items, will be layered over this container.
*/
export default class C_MusicSheet extends GameObjects.Container{

    private readonly staff_texture_name = 'staff'

    constructor(scene: Phaser.Scene, x: number, y: number, hand: WhichHands) {
        super(scene, x, y)
        scene.add.existing(this);

        this.add_staff_lines();
        this.add_clef(hand)
    }

    private add_staff_lines = () => {
        let staff_image = this
            .scene
            .add
            .image(0, 0, 'staff')
            .setOrigin(0, .5)

        this.add(staff_image);
    }

    private add_clef = (hand: WhichHands) => {
        if (hand == WhichHands.RIGHT) {
            this.add_treble_clef();
        } else if (hand == WhichHands.LEFT) {
            this.add_bass_clef();
        }
    }

    private add_treble_clef = () => {
        let x = ObjectPositions.UNIT() * 2;
        let y = ObjectPositions.UNIT() / 5
        let clef_image = this
            .scene
            .add
            .image(x, y, 'treble_clef')
            .setOrigin(.5, .5)

        this.add(clef_image);
    }

    private add_bass_clef = () => {
        let x = ObjectPositions.UNIT() * 2
        let y = 0 - ObjectPositions.UNIT() * .4
        let clef_image = this
            .scene
            .add
            .image(x, y, 'bass_clef')
            .setOrigin(.5, .5)

        this.add(clef_image);
    }

}