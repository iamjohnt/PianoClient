import { Client } from "@stomp/stompjs";
import ChordObservable from "../keyboard_connection/ChordObservable"
import StompConnection from "./StompConnection";
import StompInbound from "./StompInbound";
import StompOutbound from "./StompOutbound";
import HelloResponse from "./response_objects/HelloResponse";
import StartGameResponse from "./response_objects/StartGameResponse";

// prepare any callbacks prior to connecting - onConnect subscribes for stomp responses, using those callbacks

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

        // this.stompClient.onConnect = () => {

        //     this.stompClient.subscribe('/user/queue/hello', (response: any) => {
        //         console.log("response received from stomp server")
        //         let hello: HelloResponse = JSON.parse(response.body);
        //         this.stompIn.onHelloResponseHandler(hello);
        //     });

        //     this.stompClient.subscribe('/user/queue/chord', (response: any) => {
        //         console.log("response received from stomp server")
        //         console.log(JSON.parse(response.body));
        //         this.stompIn.onChordResponseHandler(response)
        //     });

        //     this.stompClient.subscribe('/user/queue/settings', (response: any) => {
        //         console.log(JSON.parse(response.body));
        //         this.stompIn.onSettingsResponseHandler(response);
        //     });

        //     this.stompClient.subscribe('/user/queue/startgame', (response: any) => {
        //         let chordSequence: StartGameResponse = JSON.parse(response.body);
        //         this.stompIn.onStartGameResponseHandler(chordSequence)
        //     });
        // }

        this.stompClient.activate();
    }

    public disconnectStomp = () => {
        this.stompClient.forceDisconnect();
    }

}