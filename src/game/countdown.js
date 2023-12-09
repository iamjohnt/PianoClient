class Countdown {

    constructor() {
        this.MAX_TIME_LEFT = 100;
        this.TICK_INTERVAL = 10;
        this.timeLeft = this.MAX_TIME_LEFT;
        this.isActive = false;
        this.intervalId;
        this.onCountdownDone = () => console.log("default onCountdownDone. please set new one");
    }

    tick = () => {

        // timer not done
        if (this.timeLeft > 0) {
            this.timeLeft -= this.TICK_INTERVAL;
            console.debug(this.timeLeft);
            
        // timer done
        } else {
            this.isActive = false;
            console.debug("countdown done");
            this.onCountdownDone();
            clearInterval(this.intervalId);
            this.timeLeft = this.MAX_TIME_LEFT;
        }
    }

    startCountdown() {
        this.isActive = true;
        this.intervalId = setInterval(this.tick, this.TICK_INTERVAL);
        console.debug("countdown started");
    }
    
    refreshCountdown = () => {
        this.timeLeft = this.MAX_TIME_LEFT;
        console.debug("countdown refreshed");
    }

    setOnCountdownDone = (newHandler) => {
        this.onCountdownDone = newHandler;
    }

}

export {Countdown};