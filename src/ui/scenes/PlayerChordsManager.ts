import { GameObjects } from "phaser";
import SheetNote from "../../music_model/SheetNote";
import { NoteOnOff } from "../../music_model/Enums";
import PlayerNote from "../sprite/PlayerNote";

export default class PlayerChordsManager {

    private scene: Phaser.Scene;
    private possiblePlayerSprites: Map<number, PlayerNote>;


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

    public v2 = (noteEvent: SheetNote) => {
        let onOff = noteEvent.getOnOrOff();
        let note = noteEvent.getSheetNote();
        let noteAbove = note + 1;
        let noteBelow = note - 1;

        if (onOff == NoteOnOff.ON) {
            let sprite: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(note);
            let spriteAbove: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(noteAbove);
            let spriteBelow: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(noteBelow);

            if (spriteAbove?.visible == false && spriteBelow?.visible == false) {
                // no collision
                sprite?.setVisible(true);
            } else if (spriteBelow?.x == 725 || spriteAbove?.x == 725) {
                sprite?.setX(800)
                sprite?.setVisible(true)
            } else {
                sprite?.setX(725)
                sprite?.setVisible(true)
            }
        } else {
            let sprite: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(note);
            let spriteAbove: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(noteAbove);
            let spriteBelow: GameObjects.Sprite | undefined = this.possiblePlayerSprites.get(noteBelow);

            sprite?.setX(800)
            sprite?.setVisible(false);
            
            spriteBelow?.setX(800)
            spriteAbove?.setX(800)
            
        }
    }

    public handleNoteOnOrOff = (noteEvent: SheetNote) => {

        if (noteEvent.getOnOrOff() == NoteOnOff.ON) {
            let noteSprite: PlayerNote | undefined = this.possiblePlayerSprites.get(noteEvent.getSheetNote());
            if (noteSprite) {
                noteSprite.fadeIn(() => {})
            }
        } else {
            let noteSprite: PlayerNote | undefined = this.possiblePlayerSprites.get(noteEvent.getSheetNote());
            if (noteSprite) {
                noteSprite.fadeIn(() => {})
            }
        }
    }

    private populatePlayerNoteSprites = (): Map<number, PlayerNote> => {

        let sprites: Map<number, PlayerNote> = new Map<number, PlayerNote>();

        let staffCenterPos = 700;
        let intervalDist = 50;
        let noteCount = 17;
        let key = -8; // center of 17 is 9. zero out the 9, and you get range of -8 to +8

        for (let i = key; i < 8; i++) {
            let y = staffCenterPos - (i * intervalDist);
            // let curSprite: GameObjects.Sprite = this.scene.add.sprite(800, y, 'note').setVisible(false)
            let curSprite: PlayerNote = new PlayerNote(this.scene, 800, y, 'note');
            sprites.set(i, curSprite)
        }

        return sprites;
    } 
}