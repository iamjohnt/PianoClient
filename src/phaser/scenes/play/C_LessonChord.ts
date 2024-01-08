import { GameObjects } from "phaser";
import SheetChord from "../../../music_model/SheetChord";
import ObjectPositions from "../../ObjectPositions";
import SheetNoteYPositions from "./SheetNoteYPositions";

export default class C_LessonChord extends Phaser.GameObjects.Container {

    private notes: Map<number, GameObjects.Sprite>;
    private sheetNoteYPositions: SheetNoteYPositions;

    constructor(scene: Phaser.Scene, x: number, y: number, sheetChord: SheetChord) {
        super(scene, x, y)
        scene.add.existing(this);

        this.sheetNoteYPositions = new SheetNoteYPositions();
        this.notes = new Map<number, GameObjects.Sprite>;
        this.spawnNotes(sheetChord);
    }

    public spawnNotes = (sheetChord: SheetChord) => {
        this.scene.add.sprite(200, 200, 'note');
        sheetChord.getSheetNotes().forEach( note => {
            let noteSprite: GameObjects.Sprite;
            let noteY = this.sheetNoteYPositions.getYPosition(note);
            if (this.isNoteWouldCollide(note.getSheetNote())) {
                noteSprite = this.scene.add.sprite(0 - ObjectPositions.NOTE_COLLIDE_OFFSET(), noteY, 'note')
                this.notes.set(note.getSheetNote(), noteSprite)
                this.add(noteSprite);
            } else {
                noteSprite = this.scene.add.sprite(0, noteY, 'note')
                this.notes.set(note.getSheetNote(), noteSprite)
                this.add(noteSprite);
            }
        });
    }

    private isNoteWouldCollide = (note: number) => {
        let spriteAbove: GameObjects.Sprite | undefined = this.notes.get(note + 1);
        let spriteBelow: GameObjects.Sprite | undefined = this.notes.get(note - 1);

        if (spriteAbove != undefined && this.isOnRight(spriteAbove)) {
            return true;
        }
        if (spriteBelow != undefined && this.isOnRight(spriteBelow)) {
            return true;
        }
        return false;
    }

    private isOnRight = (noteSprite: GameObjects.Sprite) => {
        return noteSprite.x == this.x;
    }
}