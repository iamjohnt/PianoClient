export default class ObjectPositions{

    // base values, from which all else is derived
    private static readonly H: number = 1200;
    private static readonly W: number = 2600;

    // global
    public static readonly HEIGHT = () => this.H
    public static readonly WIDTH = () => this.W
    public static readonly UNIT = () => this.H / 12
    public static readonly HALF_UNIT = () => this.UNIT() / 2

    // welcome
    public static readonly LOGO_CENTER_X = () => this.W / 2
    public static readonly LOGO_CENTER_Y = () => this.H * (1/2)
    public static readonly WELCOME_MSG_CENTER_X = () => this.W / 2
    public static readonly WELCOME_MSG_CENTER_Y = () => this.H * (7/8)
    public static readonly GLINT_CENTER_X = () => this.W * (2/3) - this.HALF_UNIT()
    public static readonly GLINT_CENTER_Y = () => this.H * (1/4) - this.HALF_UNIT()

    // settings

    // chordpool
    public static readonly SINGLE_TEXT_CENTER_X = () => this.W * (1/4)
    public static readonly SINGLE_TEXT_CENTER_Y = () => this.H * (1/4)

    public static readonly COMBO_TEXT_CENTER_X = () => this.W * (3/4)
    public static readonly COMBO_TEXT_CENTER_Y = () => this.H * (1/4)

    // game
    public static readonly PLAYER_NOTE_CENTER_X = () => this.UNIT() * 8;
    public static readonly NOTE_COLLIDE_OFFSET = () => this.UNIT() * .75

    public static readonly STAFF_TOPLEFT_X = () => this.UNIT() * 4;
    public static readonly STAFF_TOPLEFT_Y = () => this.H * (1/3);
    public static readonly STAFF_CENTER_Y = () => 700;

    public static readonly GAP_TWEEN_LESSON_CHORDS = () => this.UNIT() * 5;

}