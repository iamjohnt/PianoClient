import { Countdown } from "./countdown.js";

class Game {

    constructor() {
        this.chordBuffer = new Set();
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
            this.chordBuffer.add(noteValue);
            console.info(noteValue);
        }
    }

    submitChord = () => {
        console.info("{" + Array.from(this.chordBuffer).join(', ') + "}");
        this.chordBuffer.clear();
    }

    setOnChordReady = (newHandler) => {
        this.onChordReady = newHandler;
        this.submitChord = () => {
            console.info("{" + Array.from(this.chordBuffer).join(', ') + "}");
            newHandler(this.chordBuffer);
            this.chordBuffer.clear();
        }
        this.countdown.setOnCountdownDone(this.submitChord);
    }

}

export {Game};