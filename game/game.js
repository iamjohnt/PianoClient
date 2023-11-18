import { Countdown } from "./countdown.js";

class Game {

    constructor() {
        this.countdown = new Countdown();
        this.countdown.setOnCountdownDone(this.submitChord);
        this.chordBuffer = new Set();
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

}

export {Game};