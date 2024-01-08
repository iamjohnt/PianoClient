import { GameObjects } from "phaser";
import SheetChord from "../../../music_model/SheetChord";
import ObjectPositions from "../../ObjectPositions";

export default class C_LessonChord extends Phaser.GameObjects.Container {

    private note_collide_offset: number;
    private notes: Map<number, GameObjects.Sprite>;

    constructor(scene: Phaser.Scene, x: number, y: number, sheetChord: SheetChord, note_collide_offset: number) {
        super(scene, x, y)
        this.note_collide_offset = note_collide_offset;
        this.notes = new Map<number, GameObjects.Sprite>;
        this.spawnNotes(sheetChord);
        let asdf: ObjectPositions = new ObjectPositions();
    }

    public spawnNotes = (sheetChord: SheetChord) => {
        sheetChord.getSheetNotes().forEach( note => {
            let noteSprite: GameObjects.Sprite;
            if (this.isNoteWouldCollide(note.getSheetNote())) {
                noteSprite = this.scene.add.sprite(0 - this.note_collide_offset, 0, 'note')
                this.notes.set(note.getSheetNote(), noteSprite)
                this.add(noteSprite);
            } else {
                noteSprite = this.scene.add.sprite(0, 0, 'note')
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