import SheetNote from "../../../music_model/SheetNote";
import { NoteOnOff } from "../../../music_model/Enums";
import PlayerNote from "./PlayerNote";
import MidiObservable from "../../../keyboard_connection/MidiObservable";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import PlayScene from "./PlayScene";
import ObjectPositions from "../../ObjectPositions";
import { GameObjects } from "phaser";
import GameContext from "../../GameContext";

export default class C_PlayerNotePool extends GameObjects.Container implements MidiObservable {

    private possiblePlayerSprites: Map<number, PlayerNote>;
    private context: GameContext;


    constructor(scene: Phaser.Scene, x: number, y: number, context: GameContext) {
        super(scene, x, y)
        scene.add.existing(this)
        this.context = context;

        this.possiblePlayerSprites = this.populatePlayerNoteSprites();
        this.spawnCursor();
    }


    /*
    handle ledger
    upon noteOn / noteOff, update lowest and highest note
    unhide / hide ledgers based upon lowest and highest note
    so if highest is 6 or 7, then spawn first ledger - if 8 or 9 then spawn first and second ledger
    */
    public onUpdate(midiMessage: MidiMessage): void {
        let sheetNote: SheetNote = this.context.converter.getSheetNote(midiMessage);
        let onOff = sheetNote.getOnOrOff();
        let note = sheetNote.getSheetNote();
        let noteAbove = note + 1;
        let noteBelow = note - 1;

        if (onOff == NoteOnOff.ON) {
            let sprite: PlayerNote | undefined = this.possiblePlayerSprites.get(note);
            let spriteAbove: PlayerNote | undefined = this.possiblePlayerSprites.get(noteAbove);
            let spriteBelow: PlayerNote | undefined = this.possiblePlayerSprites.get(noteBelow);

            if ((!spriteAbove || spriteAbove?.getIsActive() == false) && (!spriteBelow || spriteBelow?.getIsActive() == false)) {
                // no collision
                if (sprite) {
                    sprite.setIsActive(true);
                    sprite.isOffset = false;
                    sprite.fadeIn()
                }
            } else if (spriteBelow?.isOffset || spriteAbove?.isOffset) {
                // collision on left, so place right
                if (sprite) {
                    sprite.setIsActive(true);
                    sprite.isOffset = false;
                    sprite.fadeIn()
                }
            } else {
                // collision on right, so place left
                if (sprite) {
                    sprite.setIsActive(true);
                    sprite.isOffset = true;
                    sprite.goLeft()
                    sprite.fadeIn()
                }
            }
        } else {
            // taking note off, so maybe all collided notes can reset? need to confirm, possible bug - possibly need flag / semaphore to avoid race condition
            let sprite: PlayerNote | undefined = this.possiblePlayerSprites.get(note);
            if (sprite) {
                sprite.setIsActive(false)
                sprite.isOffset = false;
                sprite.goRight(() => sprite?.setIsActive(false))
                sprite.fadeOut();
            }

            let spriteAbove: PlayerNote | undefined = this.possiblePlayerSprites.get(noteAbove);
            let spriteBelow: PlayerNote | undefined = this.possiblePlayerSprites.get(noteBelow);
            
            spriteBelow?.goRight()
            spriteAbove?.goRight()
        }
    }

    private populatePlayerNoteSprites = (): Map<number, PlayerNote> => {

        let sprites: Map<number, PlayerNote> = new Map<number, PlayerNote>();

        let staffCenterPos = ObjectPositions.STAFF_CENTER_Y();
        let intervalDist = ObjectPositions.VERTICAL_GAP_TWEEN_NOTES();
        let noteCount = 17;
        let key = -8; // center of 17 is 9. zero out the 9, and you get range of -8 to +8

        for (let i = key; i <= 8; i++) {
            let y = staffCenterPos - (i * intervalDist);
            let curSprite: PlayerNote = new PlayerNote(this.scene, 0, y, 'blue_note');
            this.add(curSprite);
            sprites.set(i, curSprite)
        }

        return sprites;
    }

    private spawnCursor = () => {

        let cursor = this.scene.add.image(0, ObjectPositions.HEIGHT() / 2, 'cursor').setAlpha(.3).setScale(.75, 1).setOrigin(.5, .5)
        this.add(cursor)

        this.scene.tweens.add({
            targets: cursor,
            alpha: .1,
            yoyo: true,
            ease: Phaser.Math.Easing.Quadratic.InOut,
            duration: 700,
            repeat: -1
        })
    }
}