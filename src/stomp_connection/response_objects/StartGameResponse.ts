class ChordWrapper {
    public chord: Array<number>
}

export default class StartGameResponse {

    public isStartGameSuccess: boolean;
    public message: string;
    public chordSequence: Array<ChordWrapper>;
    
}

export {ChordWrapper};