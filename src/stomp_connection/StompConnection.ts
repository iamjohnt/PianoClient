import * as StompJsTypes from "@stomp/stompjs"

export default class StompConnection {

    private stompURL = 'ws://localhost:8081/ws';
    private stompDomain = 'ws://localhost:8080';
    private stompBrokerPath = '/chordresponse';
    private stompSendChordPath = '/chord'

    private stompClient: any;

    constructor(stompConnectionUrl: string) {
        this.stompURL = stompConnectionUrl;
    }

    public connectStomp = () => {

        console.log("Attempting to connect...");

        this.stompClient = new StompJsTypes.Client({
            brokerURL: this.stompURL
        });
        
        this.stompClient.onWebSocketError = (error: any) => {
            console.error('Error with websocket:', error);
        };

        this.stompClient.onStompError = (frame: any) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.stompClient.onConnect = (frame: any) => {
            
            console.log('Connected: ' + frame);

            this.stompClient.subscribe('/topic/chord', (response: any) => {
                console.log("response received from stomp server")
                console.log(JSON.parse(response.body));
            });

            this.stompClient.subscribe('/topic/greetings', (response: any) => {
                console.log(JSON.parse(response.body));
            });
        };

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

    public getStompClient = (): StompJsTypes.Client => {
        return this.stompClient;
    }


}