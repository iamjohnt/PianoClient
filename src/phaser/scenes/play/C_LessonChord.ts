import { GameObjects } from "phaser";
import SheetChord from "../../../music_model/SheetChord";
import ObjectPositions from "../../ObjectPositions";
import SheetNoteYPositions from "./SheetNoteYPositions";
import SheetNote from "../../../music_model/SheetNote";

export default class C_LessonChord extends Phaser.GameObjects.Container {

    private noteSprites: Map<number, GameObjects.Sprite>;
    private sheetNoteYPositions: SheetNoteYPositions;

    constructor(scene: Phaser.Scene, x: number, y: number, sheetChord: SheetChord) {
        super(scene, x, y)
        scene.add.existing(this);

        this.sheetNoteYPositions = new SheetNoteYPositions();
        this.noteSprites = new Map<number, GameObjects.Sprite>;
        this.spawnNotes(sheetChord);
    }

    private spawnNotes = (sheetChord: SheetChord) => {
        let chords = sheetChord.getSheetNotes();

        chords.forEach( note => {
            if (this.isNoteWouldCollide(note.getSheetNote())) {
                this.spawnRight(note);
            } else {
                this.spawnLeft(note);
            }
        });
    }

    private spawnRight = (sheetNote: SheetNote) => {

        let noteX = 0 - ObjectPositions.NOTE_COLLIDE_OFFSET();
        let noteY = this.sheetNoteYPositions.getYPosition(sheetNote);

        let noteSprite: GameObjects.Sprite = this.scene.add.sprite(
            noteX,
            noteY,
            'note'
        )
        this.noteSprites.set(sheetNote.getSheetNote(), noteSprite)
        this.add(noteSprite);
    }

    private spawnLeft = (sheetNote: SheetNote) => {
        
        let noteX = 0;
        let noteY = this.sheetNoteYPositions.getYPosition(sheetNote);

        let noteSprite: GameObjects.Sprite = this.scene.add.sprite(
            noteX,
            noteY,
            'note'
        )
        this.noteSprites.set(sheetNote.getSheetNote(), noteSprite)
        this.add(noteSprite);
    }

    private isNoteWouldCollide = (note: number) => {
        let spriteAbove: GameObjects.Sprite | undefined = this.noteSprites.get(note + 1);
        let spriteBelow: GameObjects.Sprite | undefined = this.noteSprites.get(note - 1);

        let collideAbove = spriteAbove != undefined && this.isOnRight(spriteAbove)
        let collideBelow = spriteBelow != undefined && this.isOnRight(spriteBelow)

        return collideAbove || collideBelow;
    }

    private isOnRight = (noteSprite: GameObjects.Sprite) => {
        return noteSprite.x + this.x == this.x;
    }
}