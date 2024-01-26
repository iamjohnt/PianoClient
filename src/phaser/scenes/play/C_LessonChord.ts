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
        this.spawnLedgers(sheetChord);
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

    private spawnLedgers = (sheetChord: SheetChord) => {

        let top = sheetChord.getTopPosition();
        let bot = sheetChord.getBottomPosition();
        
        if (top >= 6) {
            let y = this.sheetNoteYPositions.getYPositionFromValue(6)
            let ledgerSprite = this.scene.add.sprite(0, y, 'ledger')
            this.add(ledgerSprite)
        }
        if (top >= 8) {
            let y = this.sheetNoteYPositions.getYPositionFromValue(8)
            let ledgerSprite = this.scene.add.sprite(0, y, 'ledger')
            this.add(ledgerSprite)
        }
        if (bot <= -6) {
            let y = this.sheetNoteYPositions.getYPositionFromValue(-6)
            let ledgerSprite = this.scene.add.sprite(0, y, 'ledger')
            this.add(ledgerSprite)
        }
        if (bot <= -8) {
            let y = this.sheetNoteYPositions.getYPositionFromValue(-8)
            let ledgerSprite = this.scene.add.sprite(0, y, 'ledger')
            this.add(ledgerSprite)
        }
    }

    private spawnRight = (sheetNote: SheetNote) => {

        let noteX = 0 - ObjectPositions.NOTE_COLLIDE_OFFSET();
        let noteY = this.sheetNoteYPositions.getYPosition(sheetNote);

        let noteSprite: GameObjects.Sprite = this.scene.add.sprite(
            noteX,
            noteY,
            'note_sprite'
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
            'note_sprite'
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

    public fadeOut = () => {
        // this.noteSprites.forEach(sprite => {
        //     this.scene.tweens.add({
        //         targets: sprite,
        //         alpha: 0,
        //         duration: 1,
        //         ease: 'Linear',
        //         onComplete: () => sprite.destroy()
        //     });
        // })
        let children:Array<GameObjects.GameObject> = this.getAll();
        children.forEach(obj => {
            obj.destroy()
        })
    }

    // private createNoteExplodeAnimation = () => {
    //     this.noteSprites.forEach(sprite => {
    //         sprite.anims.create({
    //             key: 'explode',
    //             frames: this.scene.anims.generateFrameNumbers('note_sprite', {start: 5, end: 13,}),
    //             frameRate: 30,
    //             repeat: 0
    //         })
    
    //         sprite.on('animationcomplete', () => {
    //             sprite.destroy()
    //         })
    //     })
    // }

    // public explode = () => {
    //     this.noteSprites.forEach(sprite => {
    //         sprite.play('explode');
    //     })
    // }
}