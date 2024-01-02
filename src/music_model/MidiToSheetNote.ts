import { WhichHands } from "../game/Enum";
import MidiMessage from "../keyboard_connection/MidiMessage";
import BlackWhiteKeys from "./BlackWhiteKeys";
import { Accidental, Clef, KeySigMode, KeySigNote, NoteOnOff } from "./Enums";
import KeySignature from "./KeySignature";
import NotePositionsOnClef from "./NotePositionsOnClef";
import SheetNote from "./SheetNote";

export default class MidiToSheetNote {

    private keySig: KeySignature;
    private util: BlackWhiteKeys;
    private offsetsFromCenterMap: NotePositionsOnClef;

    constructor (note: KeySigNote, mode: KeySigMode, hand: WhichHands) {
        this.keySig = new KeySignature(note, mode);
        this.util = new BlackWhiteKeys();

        let clef!: Clef;

        if (hand == WhichHands.LEFT) {
            clef = Clef.BASS_CLEF 
        } else if (hand == WhichHands.RIGHT) {
            clef = Clef.TREBLE_CLEF
        }

        this.offsetsFromCenterMap = new NotePositionsOnClef(clef);
    }

    public getSheetNote(midi_message: MidiMessage) {

        if (this.util.isBlackKey(midi_message.getNote())) {
            return this.getBlackKeySheetNote(midi_message)
        } 
        else {
            return this.getWhiteKeySheetNote(midi_message);
        }
    }

    private getBlackKeySheetNote = (msg: MidiMessage): SheetNote => {
        if (this.keySig.getAccidental() == Accidental.FLAT) {
            let adjustedNote = msg.getNote() + 1;
            let onOrOff = msg.isNoteOn() ? NoteOnOff.ON : NoteOnOff.OFF;
            let posFromCenter = this.offsetsFromCenterMap.getPositionByNote(adjustedNote);
            return new SheetNote(posFromCenter, Accidental.FLAT, onOrOff);
        } 
        else {
            let adjustedNote = msg.getNote() - 1;
            let onOrOff = msg.isNoteOn() ? NoteOnOff.ON : NoteOnOff.OFF;
            let posFromCenter = this.offsetsFromCenterMap.getPositionByNote(adjustedNote);
            return new SheetNote(posFromCenter, Accidental.SHARP, onOrOff);
        }
    }

    private getWhiteKeySheetNote = (msg: MidiMessage) => {
        let posFromCenter = this.offsetsFromCenterMap.getPositionByNote(msg.getNote());
        let onOrOff = msg.isNoteOn() ? NoteOnOff.ON : NoteOnOff.OFF;
        return new SheetNote(posFromCenter, Accidental.NATURAL, onOrOff)
    }
}