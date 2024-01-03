import * as StompJsTypes from "@stomp/stompjs"
import HelloResponse from "./response_objects/HelloResponse";
import StartGameResponse from "./response_objects/StartGameResponse";
import StompMethods from "./StompMethods";
import ChordSequenceHandler from "./ChordSequenceHandler";

export default class StompConnection {

    private stompURL = 'ws://localhost:8081/ws';
    private stompDomain = 'ws://localhost:8080';
    private stompBrokerPath = '/chordresponse';
    private stompSendChordPath = '/chord'

    private stompClient: any;

    public stompMethods: StompMethods;

    public chordSequenceHandler: ChordSequenceHandler;

    constructor(stompConnectionUrl: string) {
        this.stompURL = stompConnectionUrl;
    }

    public connectStomp = () => {
        console.log("Attempting to connect...");

        this.stompClient = new StompJsTypes.Client({
            brokerURL: this.stompURL
        });

        this.privateSetDefaultStompClientCallbacks(this.stompClient);

        this.stompClient.activate();

        this.stompMethods = new StompMethods(this.stompClient);
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

    public getStompClient = (): StompJsTypes.Client => {
        return this.stompClient;
    }

    public privateSetDefaultStompClientCallbacks = (stompClient: StompJsTypes.Client) => {

        stompClient.onWebSocketError = (error: any) => {
            console.error('Error with websocket:', error);
        };

        stompClient.onStompError = (frame: any) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        stompClient.onConnect = (frame: any) => {
            
            console.log('Connected: ' + frame);

            stompClient.subscribe('/user/queue/chord', (response: any) => {
                console.log("response received from stomp server")
                console.log(JSON.parse(response.body));
            });

            stompClient.subscribe('/user/queue/settings', (response: any) => {
                console.log(JSON.parse(response.body));
            });

            stompClient.subscribe('/user/queue/hello', (response: any) => {
                console.log("response received from stomp server")
                let hello: HelloResponse = JSON.parse(response.body);
                console.log(hello.content + "ayylmao")
            });

            stompClient.subscribe('/user/queue/startgame', (response: any) => {
                console.log("response received from stomp server")
                let startGameResponse: StartGameResponse = JSON.parse(response.body);
                console.log(startGameResponse)
                this.chordSequenceHandler.handleChordSequence(startGameResponse)
            });
        };
    }




}