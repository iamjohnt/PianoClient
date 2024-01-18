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
    public static readonly GAP_TWEEN_BUTTONS_X = () => this.UNIT() * 5
    public static readonly GAP_TWEEN_BUTTONS_Y = () => this.UNIT() * 4

    public static readonly ROW_1 = () => this.H * (1/3)
    public static readonly ROW_2 = () => this.H * (2/3)

    public static readonly COL_1 = () => this.W * (1/10) + this.UNIT()
    public static readonly COL_2 = () => this.W * (3/10) + this.UNIT() * (6/10)
    public static readonly COL_3 = () => this.W * (5/10) + this.UNIT()
    public static readonly COL_4 = () => this.W * (7/10) + this.UNIT() * (6/10)

    // settings text
    public static readonly SINGLE_TEXT_CENTER_X = () => this.COL_1()
    public static readonly SINGLE_TEXT_CENTER_Y = () => this.H * (1/7)

    public static readonly COMBO_TEXT_CENTER_X = () => this.COL_3()
    public static readonly COMBO_TEXT_CENTER_Y = () => this.H * (1/7)

    // settings chordpool single
    public static readonly NOTE_BTN_X = () => this.COL_1()
    public static readonly NOTE_BTN_Y = () => this.ROW_1()

    public static readonly INTERVAL_BTN_X = () => this.COL_2()
    public static readonly INTERVAL_BTN_Y = () => this.ROW_1()

    public static readonly TRIAD_BTN_X = () => this.COL_1()
    public static readonly TRIAD_BTN_Y = () => this.ROW_2()

    public static readonly TETRAD_BTN_X = () => this.COL_2()
    public static readonly TETRAD_BTN_Y = () => this.ROW_2()

    // settings chordpool comb

    public static readonly NOTE_INTERVAL_X = () => this.COL_3()
    public static readonly NOTE_INTERVAL_Y = () => this.ROW_1()

    public static readonly NOTE_INTERVAL_TRIAD_X = () => this.COL_4()
    public static readonly NOTE_INTERVAL_TRIAD_Y = () => this.ROW_1()

    public static readonly NOTE_INTERVAL_TRIAD_TETRAD_X = () => this.COL_3()
    public static readonly NOTE_INTERVAL_TRIAD_TETRAD_Y = () => this.ROW_2()

    // settings hands
    public static readonly LEFT_HAND_CENTER_X = () => this.W * (1/4)
    public static readonly LEFT_HAND_CENTER_Y = () => this.H * (9/10)
    public static readonly RIGHT_HAND_CENTER_X = () =>  this.W * (3/4)
    public static readonly RIGHT_HAND_CENTER_Y = () => this.H * (9/10)
    public static readonly CHOOSE_HAND_TEXT_PROMPT_CENTER_X = () => this.W / 2
    public static readonly CHOOSE_HAND_TEXT_PROMPT_CENTER_Y = () => this.H * (2/3)
    public static readonly CHOOSE_HAND_PIANO_LEFT_X = () => 0 
    public static readonly CHOOSE_HAND_PIANO_TOP_Y = () => 0



    // game
    public static readonly PLAYER_NOTE_LEFT_X = () => this.UNIT() * 7;
    public static readonly NOTE_COLLIDE_OFFSET = () => this.UNIT() * .75

    public static readonly STAFF_TOPLEFT_X = () => this.UNIT() * 4;
    public static readonly STAFF_TOPLEFT_Y = () => this.H * (1/3);
    public static readonly STAFF_CENTER_Y = () => 700;

    public static readonly GAP_TWEEN_LESSON_CHORDS = () => this.UNIT() * 3;
    public static readonly VERTICAL_GAP_TWEEN_NOTES = () => this.HALF_UNIT();

}