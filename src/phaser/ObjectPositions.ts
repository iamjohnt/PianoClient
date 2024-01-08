export default class ObjectPositions{

    // base values, from which all else is derived
    private static H: number = 1200;
    private static W: number = 2600;

    // global
    public static HEIGHT = () => this.H
    public static WIDTH = () => this.W
    public static UNIT = () => this.H / 12

    // welcome
    public static LOGO_CENTER_X = () => this.W / 2
    public static LOGO_CENTER_Y = () => this.H / 2
    public static WELCOME_MSG_CENTER_X = () => this.W / 2
    public static WELCOME_MSG_CENTER_Y = () => this.H * (3/4)

    // settings

    // game
    public static PLAYER_NOTE_CENTER_X = () => this.UNIT() * 8;
    public static NOTE_COLLIDE_OFFSET = () => this.UNIT() * .75

    public static STAFF_TOPLEFT_X = () => this.UNIT() * 4;
    public static STAFF_TOPLEFT_Y = () => this.H * (1/3);


}