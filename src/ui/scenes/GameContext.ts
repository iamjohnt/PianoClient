import Queue from "../../data_structure/Queue";
import { GameSettings } from "../../game/GameSettings";
import MidiMessage from "../../keyboard_connection/MidiMessage";

export default class GameContext {
    
    private settings: GameSettings;
    private noteEventQ: Queue<MidiMessage>;

    constructor() {

    }

    public setSettings = (settings: GameSettings) => {
        this.settings = settings;
    }

    public setNoteEventQ = (q: Queue<MidiMessage>) => {
        this.noteEventQ = q;
    }
}