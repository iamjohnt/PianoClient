import { WhichHands } from "../../game/Enum";
import { GameSettings } from "../../game/GameSettings";

export default class Game extends Phaser.Scene{

    private settings: GameSettings;
    
    constructor() {
        super('Game');
    }

    public init = (settings: GameSettings) => {
      this.settings = settings;
    }

    public preload = () => {
      this.load.image('staff', 'assets/staff.png')
      this.load.image('bass_clef', 'assets/bass_clef.png')
      this.load.image('treble_clef', 'assets/treble_clef.png')
      this.load.image('note', 'assets/note.png')
    };
    
    public create = () => {
      this.add.image(0, 0, 'staff').setOrigin(0,0);

      if (this.settings.getWhichHands() == WhichHands.LEFT) {
        this.add.image(0, 0, 'bass_clef').setOrigin(0,0);
      }
      else {
        this.add.image(0, 0, 'treble_clef').setOrigin(0,0);
      }
    };

    public update: () => {

    };
    

}