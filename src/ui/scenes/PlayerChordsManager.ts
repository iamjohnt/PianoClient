import { GameObjects } from "phaser";
import SheetNote from "../../music_model/SheetNote";
import { NoteOnOff } from "../../music_model/Enums";

export default class PlayerChordsManager {

    private scene: Phaser.Scene;
    private possiblePlayerSprites: Map<number, GameObjects.Sprite>;


    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.possiblePlayerSprites = this.populatePlayerNoteSprites();
    }

    public addNote = (sheetNote: SheetNote) => {

        // if (willCollide) {
        //     slotIn()
        // } else {
        //     add()
        // }
    }

    public removeNote = (sheetNote: SheetNote) => {

        // if (isCollide) {
        //     tryCenterUp
        //     tryCenterDown
        // } else {
        //     remove()
        // }
    }

    public handleNoteOnOrOff = (noteEvent: SheetNote) => {

        if (noteEvent.getOnOrOff() == NoteOnOff.ON) {
            let noteSprite: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(noteEvent.getSheetNote());
            if (noteSprite) {
                noteSprite.setVisible(true);
            }
        } else {
            let noteSprite: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(noteEvent.getSheetNote());
            if (noteSprite) {
                noteSprite.setVisible(false);
            }
        }
    }

    private populatePlayerNoteSprites = (): Map<number, GameObjects.Sprite> => {

        let sprites: Map<number, GameObjects.Sprite> = new Map<number, GameObjects.Sprite>();

        let staffCenterPos = 700;
        let intervalDist = 50;
        let noteCount = 17;
        let key = -8; // center of 17 is 9. zero out the 9, and you get range of -8 to +8

        for (let i = key; i < 8; i++) {
            let y = staffCenterPos - (i * intervalDist);
            let curSprite: GameObjects.Sprite = this.scene.add.sprite(600, y, 'note').setVisible(false)
            sprites.set(i, curSprite)
        }

        return sprites;
    } 
}