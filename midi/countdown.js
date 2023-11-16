class Countdown {
    MAX_TIME_LEFT = 100;
    TICK_INTERVAL = 10;
    intervalId;
    isActive = false;
    timeLeft = this.MAX_TIME_LEFT;

    onCountdownDone;

    constructor(onCountdownDone) {
        this.onCountdownDone = onCountdownDone;
    }

    tick = () => {

        // timer not done
        if (this.timeLeft > 0) {
            this.timeLeft -= this.TICK_INTERVAL;
            console.log(this.timeLeft)

        // timer done
        } else {
            this.isActive = false;
            this.onCountdownDone();
            clearInterval(this.intervalId);
            this.timeLeft = this.MAX_TIME_LEFT;
        }
    }

    startCountdown() {
        this.isActive = true;
        this.intervalId = setInterval(this.tick, this.TICK_INTERVAL);
    }
    
    refreshCountdown = () => {
        console.log("countdown refreshed to " + this.MAX_TIME_LEFT);
        this.timeLeft = this.MAX_TIME_LEFT;
    }
}

export {Countdown};