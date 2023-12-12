export default class CountdownV2 {

    private timeoutId: any;
    private milliseconds: number;
    private onCountdownDone: Function;

    constructor(onCountdownDone: Function, milliseconds: number) {
        this.onCountdownDone = onCountdownDone;
        this.milliseconds = milliseconds;
    }

    public startOrRestartCountdown: any = () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(this.onCountdownDone, this.milliseconds);
    }

    public setOnCountdownDone = (newHandler: Function) => {
        this.onCountdownDone = newHandler;
    }

}