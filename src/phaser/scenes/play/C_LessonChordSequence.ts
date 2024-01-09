import Queue from "../../../data_structure/Queue";
import { Accidental, NoteOnOff } from "../../../music_model/Enums";
import SheetChord from "../../../music_model/SheetChord";
import SheetNote from "../../../music_model/SheetNote";
import ObjectPositions from "../../ObjectPositions";
import C_LessonChord from "./C_LessonChord";

export default class C_LessonChordSequence extends Phaser.GameObjects.Container{

    public isAnimating: boolean;
    private c_lessonChords: Queue<C_LessonChord>;

    constructor(scene: Phaser.Scene, x: number, y: number, chordSequence: Queue<SheetChord>) {
        super(scene, x, y)
        this.c_lessonChords = new Queue<C_LessonChord>(chordSequence.getSize());
        this.isAnimating = false;
        this.spawnChordSequence(chordSequence);
        this.setVisible(true);
    }

    public spawnChordSequence = (chordSeq: Queue<SheetChord>) => {

        let dummySheet = new SheetChord();
        dummySheet.addNote(new SheetNote(0, Accidental.NATURAL, NoteOnOff.ON))
        dummySheet.addNote(new SheetNote(2, Accidental.NATURAL, NoteOnOff.ON))
        dummySheet.addNote(new SheetNote(4, Accidental.NATURAL, NoteOnOff.ON))
        let asdf = new C_LessonChord(this.scene, 200, 0, dummySheet)

        console.log(chordSeq.isEmpty());
        let sheetChord: SheetChord = chordSeq.dequeue();
        let bro = new C_LessonChord(this.scene, 600, 0, sheetChord)

        // ---

        let pos = 0;
        while (!chordSeq.isEmpty()) {
            let thing: SheetChord = chordSeq.dequeue();
            let chord_container = new C_LessonChord(this.scene, pos, 0, thing)
            setTimeout(() => {
                // this.add(chord_container) <--- for some reason this line is causing things to not render. render time issue? C_LessonChord is adding to scene directly, and not to container? Container / Sprite lifecycle mismatch issue?
                // i think the issue, is that i'm registering the sprite in C_LessonChord to the scene, and not to the container
                // containers should instantiate, before you add things to it
                // so construct C_LessonChordSequence - then constructor C_LessonChord - then add to parent - then add sprites to C_LessonChord
                this.c_lessonChords.enqueue(chord_container);
            }, 1000)
            pos += ObjectPositions.GAP_TWEEN_LESSON_CHORDS();
        }
        console.log("asdf");
        console.log(this.c_lessonChords);
    }


}