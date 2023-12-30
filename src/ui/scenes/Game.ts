import MidiMessage from "../../keyboard_connection/MidiMessage";
import GameContext from "./GameContext";

export default class Game extends Phaser.Scene{

    private context: GameContext;

    constructor() {
      super({ key: 'Game' });
    }

    public init = (context: GameContext) => {
      this.context = context;
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
      if (!this.context.noteEventQ.isEmpty()) {

          let noteEvent: MidiMessage = this.context.noteEventQ.dequeue();

    };
  }

}