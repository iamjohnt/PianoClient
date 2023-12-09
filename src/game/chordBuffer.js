import { Countdown } from "./countdown.js";

class ChordBuffer {

    constructor() {
        this.chord = new Set();
        this.countdown = new Countdown();
        this.countdown.setOnCountdownDone(() => console.log("default onCountdownDone. please set new one"));
    }

    addNoteToChord = (message) => {
        let isDownKey = message.data[0] == 144 && message.data[2] != 0;
        let noteValue = message.data[1];
        if (isDownKey) {
            if (this.countdown.isActive == false) {
                this.countdown.startCountdown();
            } else {
                this.countdown.refreshCountdown();
            }
            this.chord.add(noteValue);
            console.info(noteValue);
        }
    }

    submitChord = () => {
        console.info("{" + Array.from(this.chord).join(', ') + "}");
        this.chord.clear();
    }

    setOnChordReady = (newHandler) => {
        this.onChordReady = newHandler;
        this.submitChord = () => {
            console.info("{" + Array.from(this.chord).join(', ') + "}");
            newHandler(this.chord);
            this.chord.clear();
        }
        this.countdown.setOnCountdownDone(this.submitChord);
    }

}

export {ChordBuffer};