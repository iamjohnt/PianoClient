export default class MidiMessage {

    private status: number;
    private note: number;
    private velocity: number;

    constructor(status: number, note: number, velovity: number){
        this.status = status;
        this.note = note;
        this.velocity = velovity;
    }

    public isNoteOn = (): boolean => this.status == 144 && this.velocity != 0;

    public isNoteOff = (): boolean => this.velocity == 0;

    public getNote = (): number => this.note;

}