class GameSettings {

    constructor() {
        this.keySigNote = 'C';
        this.keySigMode = 'MAJOR';
        this.chordPool = 'NOTE';
        this.whichHands = 'LEFT';
        this.leftMin =  21;
        this.leftMax = 44;
        this.rightMin = 60;
        this.rightMax = 80;
        this.length = 25;
    }

}

let asdf = new GameSettings();
asdf.aa = "hello"
console.log(asdf.aa)

export {GameSettings};