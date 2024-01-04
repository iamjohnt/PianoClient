export default class {

    // global
    public readonly HEIGHT: number;
    public readonly WIDTH: number;
    public readonly UNIT: number;

    // welcome
    public readonly LOGO_CENTER_X;
    public readonly LOGO_CENTER_Y;
    public readonly WELCOME_MSG_CENTER_X;
    public readonly WELCOME_MSG_CENTER_Y;

    // settings

    // game
    public readonly PLAYER_NOTE_CENTER_X;
    public readonly PLAYER_NOTE_CENTER_SHIFTED_X;

    public readonly STAFF_TOPLEFT_X;
    public readonly STAFF_TOPLEFT_Y;

    // public readonly TREBLE_TOPLEFT_X;
    // public readonly TREBLE_TOPLEFT_Y;
    // public readonly BASS_TOPLEFT_X;
    // public readonly BASS_TOPLEFT_Y;

    // public readonly MUSIC_SHEET_CENTER_X;
    // public readonly MUSIC_SHEET_CENTER_Y;

    // public readonly VISUAL_PIANO_TOPLEFT_X;
    // public readonly VISUAL_PIANO_TOPLEFT_Y;





    constructor() {

        // global
        this.HEIGHT = 1200;
        this.WIDTH = 2600;
        this.UNIT = this.HEIGHT / 12; // if height == 1200, unit is 100 pixels

        // welcome
        this.LOGO_CENTER_X = this.WIDTH / 2
        this.LOGO_CENTER_Y = this.HEIGHT / 2
        this.WELCOME_MSG_CENTER_X = this.WIDTH / 2
        this.WELCOME_MSG_CENTER_Y = this.HEIGHT * (3/4)

        // settings

        // game
        this.PLAYER_NOTE_CENTER_X = this.UNIT * 8;
        this.PLAYER_NOTE_CENTER_SHIFTED_X = this.PLAYER_NOTE_CENTER_X - (this.UNIT * 0.75)

        this.STAFF_TOPLEFT_X = this.UNIT * 4;
        this.STAFF_TOPLEFT_Y = this.HEIGHT * (1/3);

        



    }
}