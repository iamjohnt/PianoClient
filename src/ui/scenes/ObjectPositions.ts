export default class {

    public readonly HEIGHT: number;
    public readonly WIDTH: number;

    public readonly UNIT: number;

    public readonly PLAYER_NOTE_CENTER;
    public readonly PLAYER_NOTE_LEFT;

    constructor() {
        this.HEIGHT = 1200;
        this.WIDTH = 2600;
        this.UNIT = this.HEIGHT / 12;

        this.PLAYER_NOTE_CENTER = this.UNIT * 8;
        this.PLAYER_NOTE_LEFT = this.PLAYER_NOTE_CENTER - (this.UNIT)

    }
}