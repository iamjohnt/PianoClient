import { GameSettings } from "../../game/GameSettings";
import MidiMessage from "../../keyboard_connection/MidiMessage";
import GameContext from "./GameContext";
import Queue from "../../data_structure/Queue";
import { GameObjects } from "phaser";

export default class Game extends Phaser.Scene{

    private settings: GameSettings;
    private noteEventQ: Queue<MidiMessage>;
    private text: GameObjects.Text | undefined;

    
    constructor() {
      super({ key: 'Game' });
    }

    public init = (context: GameContext) => {
      this.settings = context.settings;
      this.noteEventQ = context.noteEventQ;
    }

    public preload = () => {
      this.load.image('staff', 'assets/staff.png')
      this.load.image('bass_clef', 'assets/bass_clef.png')
      this.load.image('treble_clef', 'assets/treble_clef.png')
      this.load.image('note', 'assets/note.png')
    };
    
    public create = () => {
      this.add.image(0, 0, 'staff').setOrigin(0,0);
      this.add.image(0, 0, 'treble_clef').setOrigin(0,0);
    };

    public update = () => {
      // todo
      if (!this.noteEventQ.isEmpty()) {

          let noteEvent: MidiMessage = this.noteEventQ.dequeue();
          
          if (noteEvent.isNoteOn()) {
            this.text = this.add.text(200, 200, 'hello');
          }
          else {
            if (this.text) {
              this.text.destroy();
              this.text = undefined;        
            }
          }

    };
  }

}