import Queue from "../../data_structure/Queue";
import { WhichHands } from "../../game/Enum";
import { GameSettings } from "../../game/GameSettings";
import MidiMessage from "../../keyboard_connection/MidiMessage";
import MidiObservable from "../../keyboard_connection/MidiObservable";
import { Clef } from "../../music_model/Enums";
import MidiToSheetNote from "../../music_model/MidiToSheetNote";
import SheetNote from "../../music_model/SheetNote";
import StartGameResponse from "../../stomp_connection/response_objects/StartGameResponse";

export default class GameContext implements MidiObservable{
    
    public settings: GameSettings;
    public noteEventQ: Queue<SheetNote>;
    private converter: MidiToSheetNote;

    constructor(settings: GameSettings) {
        this.settings = settings;
        this.noteEventQ = new Queue<SheetNote>(200);
        this.converter = this.setupConvertor(settings);
    }

    public onUpdate(midiMessage: MidiMessage): void {
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

    private setupConvertor = (settings: GameSettings): MidiToSheetNote => {
        let note = this.settings.getKeySigNote();
        let mode = this.settings.getKeySigMode();
        let clef!: Clef;

        if (this.settings.getWhichHands() == WhichHands.LEFT) {
            clef = Clef.BASS_CLEF 
        } else if (this.settings.getWhichHands() == WhichHands.RIGHT) {
            clef = Clef.TREBLE_CLEF
        }

        return new MidiToSheetNote(note, mode, clef);
    }
    
}