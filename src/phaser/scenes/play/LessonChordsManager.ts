import { GameObjects } from "phaser";
import StartGameResponse from "../../../stomp_connection/response_objects/StartGameResponse";
import Queue from "../../../data_structure/Queue";
import SheetChord from "../../../music_model/SheetChord";
import MidiMessage from "../../../keyboard_connection/MidiMessage";
import PlayScene from "./PlayScene";
import SheetNote from "../../../music_model/SheetNote";
import C_LessonChord from "./C_LessonChord";
import ObjectPositions from "../../ObjectPositions";
import ChordResponse from "../../../stomp_connection/response_objects/ChordResponse";

export default class LessonChordsManager {

    private scene: PlayScene;
    private lessonChordContainer: GameObjects.Container;
    private lessonChordQ: Queue<C_LessonChord>;


    constructor(scene: PlayScene) {
        this.scene = scene;
    }

    public spawnLessonChords = (startGameResponse: StartGameResponse) => {

        this.lessonChordContainer = this.scene.add.container(800, 0)
        
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
                let sheetNote: SheetNote = this.scene.context.converter.getSheetNote(midiNote);
                sheetChord.addNote(sheetNote);
            });

            // build a game object chord
            let c_lessonChord = new C_LessonChord(this.scene, chordX, 0, sheetChord)

            // add game object chord to container + queue
            this.lessonChordContainer.add(c_lessonChord)
            this.lessonChordQ.enqueue(c_lessonChord);

            // increment position
            chordX += ObjectPositions.GAP_TWEEN_LESSON_CHORDS();
        })
    }


    public handleChordResponse = (chordResponse: ChordResponse) => {
        console.log(chordResponse.submissionCorrect)
        if (chordResponse.submissionCorrect) {
            this.moveAllChordsLeft();
        }
        this.scene.context.isReadyForChordInput = true;
    }



    private moveAllChordsLeft = () => {

        let tween = this.scene.tweens.add({
            targets: this.lessonChordContainer,
            x: this.lessonChordContainer.x - ObjectPositions.GAP_TWEEN_LESSON_CHORDS(),
            duration: 300,
            ease: 'Quint.InOut',
            onComplete: () => {
                let leftMostChord: C_LessonChord = this.lessonChordQ.dequeue();
                this.lessonChordContainer.remove(leftMostChord)
                leftMostChord.destroy();
                this.scene.context.isReadyForChordInput = true;
            }
        });    
    }


}