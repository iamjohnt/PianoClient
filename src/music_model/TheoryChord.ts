export default class TheoryChord {
    
    private chord: Set<number> = new Set();
    
    constructor(...notes: number[]) {
        notes.forEach( (note) => {
            this.chord.add(note);
        });
    }

    public getChord = ():Set<number> => {
        return this.chord;
    }
}