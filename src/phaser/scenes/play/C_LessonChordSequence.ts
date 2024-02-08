import { GameObjects, Scene } from "phaser";
import StartGameResponse from "../../../stomp_connection/response_objects/StartGameResponse";
import Queue from "../../../data_structure/Queue";
import SheetChord from "../../../music_model/SheetChord";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import SheetNote from "../../../music_model/SheetNote";
import C_LessonChord from "./C_LessonChord";
import ObjectPositions from "../../ObjectPositions";
import ChordResponse from "../../../stomp_connection/response_objects/ChordResponse";
import GameContext from "../../GameContext";

export default class C_LessonChordSequence extends GameObjects.Container{

    private lessonChordQ: Queue<C_LessonChord>;
    private context: GameContext;


    constructor(scene: Scene, x: number, y: number, context: GameContext) {
        super(scene, x, y)
        scene.add.existing(this)
        this.context = context;
    }

    public spawnLessonChords = (startGameResponse: StartGameResponse) => {
        
        // init lesson
        let len = startGameResponse.chordSequence.length;
        this.lessonChordQ = new Queue<C_LessonChord>(len);
        let chordX = 0;

        // for every raw chord
        startGameResponse.chordSequence.forEach(chordObj => {

            // build a sheet chord
            let sheetChord: SheetChord = new SheetChord();
            chordObj.chord.forEach(note => {
                let midiNote: MidiMessage = new MidiMessage(144, note, 100);
                let sheetNote: SheetNote = this.context.converter.getSheetNote(midiNote);
                sheetChord.addNote(sheetNote);
            });

            // build a game object chord
            let c_lessonChord = new C_LessonChord(this.scene, chordX, 0, sheetChord)

            // add game object chord to container + queue
            this.add(c_lessonChord)
            this.lessonChordQ.enqueue(c_lessonChord);

            // increment position
            chordX += ObjectPositions.GAP_TWEEN_LESSON_CHORDS();
        })
    }


    public handleChordResponse = (chordResponse: ChordResponse) => {
        console.log(chordResponse.submissionCorrect)
        if (chordResponse.submissionCorrect) {
            this.moveAllChordsLeft();
        } else {
            this.context.isReadyForChordInput = true;
        }
    }



    private moveAllChordsLeft = () => {

        let removedChord = this.lessonChordQ.dequeue();
        removedChord.fadeOut();
        // this.lessonChordContainer.remove(removedChord);

        let tween = this.scene.tweens.add({
            targets: this,
            x: this.x - ObjectPositions.GAP_TWEEN_LESSON_CHORDS(),
            duration: 300,
            ease: Phaser.Math.Easing.Quintic.Out,
            onComplete: () => {
                this.context.isReadyForChordInput = true;
            }
        });
    }


}