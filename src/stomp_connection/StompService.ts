import { Client } from "@stomp/stompjs";
import ChordObservable from "../keyboard_connection/ChordObservable"
import StompInbound from "./StompInbound";
import StompOutbound from "./StompOutbound";

export default class StompService implements ChordObservable {

    public stompClient: Client;
    public stompOut: StompOutbound;
    public stompIn: StompInbound;

    constructor(stompConnectionURL: string){

        this.stompClient = new Client(
            {brokerURL: stompConnectionURL
        });

        this.stompOut = new StompOutbound(this.stompClient);
        this.stompIn = new StompInbound(this.stompClient);
    }

    public onKeyboardChord = (chord: Set<number>) => {
        this.stompOut.sendChord(chord);
    };

    public setOnConnect = (callback: (frame: any) => void) => {
        this.stompClient.onConnect = (frame: any) => {
            callback(frame);
        }
    }

    public connectStomp = () => {
        this.stompClient.activate();
    }

    public disconnectStomp = () => {
        this.stompClient.forceDisconnect();
    }

}