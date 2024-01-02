import Queue from "../../data_structure/Queue";
import { WhichHands } from "../../game/Enum";
import { GameSettings } from "../../game/GameSettings";
import MidiMessage from "../../keyboard_connection/MidiMessage";
import MidiObservable from "../../keyboard_connection/MidiObservable";
import { Clef } from "../../music_model/Enums";
import MidiToSheetNote from "../../music_model/MidiToSheetNote";
import SheetNote from "../../music_model/SheetNote";
import ChordSequenceHandler from "../../stomp_connection/ChordSequenceHandler";
import StartGameResponse from "../../stomp_connection/response_objects/StartGameResponse";

export default class GameSceneContext implements MidiObservable, ChordSequenceHandler{
    
    public settings: GameSettings;
    public noteEventQ: Queue<SheetNote>;
    private converter: MidiToSheetNote;

    constructor(settings: GameSettings) {
        this.settings = settings;
        this.noteEventQ = new Queue<SheetNote>(200);
        this.converter = new MidiToSheetNote(
            settings.getKeySigNote(), 
            settings.getKeySigMode(), 
            settings.getWhichHands()
        );
    }

    public onUpdate = (midiMessage: MidiMessage): void => {
        let sheetNote: SheetNote = this.converter.getSheetNote(midiMessage);
        this.noteEventQ.enqueue(sheetNote);
    }

    public handleChordSequence = (startGameResponse: StartGameResponse) => {
        let chordSequenceString: string = ''
        startGameResponse.chordSequence.forEach(wrapper => {
            chordSequenceString += ' | '
            let chord: Array<number> = wrapper.chordSet;
            chord.forEach(note => {
                chordSequenceString += ' ' + note.toString();
            })
        })
        console.log(chordSequenceString);
    }
    
}