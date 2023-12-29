import Queue from "../../data_structure/Queue";
import { GameSettings } from "../../game/GameSettings";
import MidiMessage from "../../keyboard_connection/MidiMessage";

export default class GameContext {
    
    public settings: GameSettings;
    public noteEventQ: Queue<MidiMessage>;
    
}