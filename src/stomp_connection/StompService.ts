import ChordObservable from "../keyboard_connection/ChordObservable"
import StompConnection from "./StompConnection";
import StompInbound from "./StompInbound";
import StompOutbound from "./StompOutbound";

export default class StompService implements ChordObservable {

    public stompConnection: StompConnection;
    public stompOut: StompOutbound;
    public stompIn: StompInbound;

    constructor(stompConnection: StompConnection){
        this.stompConnection = stompConnection;
        this.stompOut = new StompOutbound(stompConnection);
        this.stompIn = new StompInbound(stompConnection)
    }

    public onKeyboardChord = (chord: Set<number>) => {
        this.stompOut.sendChord(chord);
    };


}