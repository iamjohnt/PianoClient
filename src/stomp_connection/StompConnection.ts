import * as StompJsTypes from "@stomp/stompjs"
import HelloResponse from "./response_objects/HelloResponse";
import StartGameResponse from "./response_objects/StartGameResponse";
import StompMethods from "./StompMethods";
import ChordSequenceHandler from "./ChordSequenceHandler";

export default class StompConnection {

    private stompURL = 'ws://localhost:8081/ws';
    // private stompDomain = 'ws://localhost:8080';
    // private stompBrokerPath = '/chordresponse';
    // private stompSendChordPath = '/chord'

    public stompClient: StompJsTypes.Client;

    constructor(stompConnectionUrl: string) {
        this.stompURL = stompConnectionUrl;
        this.stompClient = new StompJsTypes.Client({
            brokerURL: this.stompURL
        });
    }

    public connectStomp = () => {
        console.log("Attempting to connect...");
        this.stompClient.activate();
    }


    public setOnWebSocketError = (callback: (error: any) => any) => {
        this.stompClient.onWebSocketError = (error: any) => {
            callback(error);
        }
    }

    public setOnStompError = (callback: (frame: any) => any) => {
        this.stompClient.onStompError = (frame: any) => {
            callback(frame);
        }
    }

    public setOnConnectSuccess = (callback: (frame: any) => any) => {
        this.stompClient.onConnect = (frame: any) => {
            callback(frame);
        }
    }
}