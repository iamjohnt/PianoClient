import { GameObjects } from "phaser";
import SheetNote from "../../../music_model/SheetNote";
import { NoteOnOff } from "../../../music_model/Enums";
import PlayerNote from "./PlayerNote";

export default class PlayerChordsManager {

    private scene: Phaser.Scene;
    private possiblePlayerSprites: Map<number, PlayerNote>;


    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.possiblePlayerSprites = this.populatePlayerNoteSprites();
    }


    public handleNoteOnOrOff = (noteEvent: SheetNote) => {
        let onOff = noteEvent.getOnOrOff();
        let note = noteEvent.getSheetNote();
        let noteAbove = note + 1;
        let noteBelow = note - 1;

        if (onOff == NoteOnOff.ON) {
            let sprite: PlayerNote | undefined = this.possiblePlayerSprites.get(note);
            let spriteAbove: PlayerNote | undefined = this.possiblePlayerSprites.get(noteAbove);
            let spriteBelow: PlayerNote | undefined = this.possiblePlayerSprites.get(noteBelow);

            if (spriteAbove?.getIsActive() == false && spriteBelow?.getIsActive() == false) {
                // no collision
                sprite?.setIsActive(true);
                sprite?.fadeIn()
            } else if (spriteBelow?.x == 725 || spriteAbove?.x == 725) {
                // collision on left, so place right
                sprite?.setIsActive(true);
                sprite?.goRight()
                sprite?.fadeIn()
            } else {
                // collision on right, so place left
                sprite?.setIsActive(true);
                sprite?.goLeft()
                sprite?.fadeIn()
            }
        } else {
            // taking note off, so maybe all collided notes can reset? need to confirm, possible bug
            let sprite: PlayerNote | undefined = this.possiblePlayerSprites.get(note);
            let spriteAbove: PlayerNote | undefined = this.possiblePlayerSprites.get(noteAbove);
            let spriteBelow: PlayerNote | undefined = this.possiblePlayerSprites.get(noteBelow);

            sprite?.setIsActive(false);
            sprite?.goRight()
            sprite?.fadeOut();
            
            spriteBelow?.goRight()
            spriteAbove?.goRight()
            
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
            let curSprite: PlayerNote = new PlayerNote(this.scene, 800, y, 'note');
            sprites.set(i, curSprite)
        }

        return sprites;
    } 
}