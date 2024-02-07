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

    public isNoteOff = (): boolean => {
        
        // for sonita's piano which follows midi spec. casio ctk 4000?
        // http://midi.teragonaudio.com/tech/midispec/noteoff.htm#:~:text=Indicates%20that%20a%20particular%20note,slowly%20fade%20the%20sound%20out.
        let condition1 = this.status >= 128 && this.status <= 143;
        let condition2 = this.note >= 0 && this.note <= 127;
        let condition3 = this.velocity >= 0 && this.velocity <= 127;

        // my piano, which follows modern note off? yamaha p-45
        // https://www.midi.org/forum/228-writing-midi-software-send-note-off,-or-zero-velocity-note-on
        let velocityIs0 = this.velocity == 0;

        return (condition1 && condition2 && condition3) || velocityIs0;
    }

    public getNote = (): number => this.note;

}