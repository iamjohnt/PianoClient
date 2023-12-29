import Queue from "../../data_structure/Queue";
import { GameSettings } from "../../game/GameSettings";
import MidiMessage from "../../keyboard_connection/MidiMessage";
import MidiObservable from "../../keyboard_connection/MidiObservable";

export default class GameContext implements MidiObservable{
    
    public settings: GameSettings;
    public noteEventQ: Queue<MidiMessage> = new Queue<MidiMessage>(200);

    public onUpdate(midiMessage: MidiMessage): void {
        this.noteEventQ.enqueue(midiMessage);
    }
    
}