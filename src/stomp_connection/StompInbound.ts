import { Client, StompSubscription } from "@stomp/stompjs";
import ChordResponse from "./response_objects/ChordResponse";
import HelloResponse from "./response_objects/HelloResponse";
import StartGameResponse from "./response_objects/StartGameResponse";
import SettingsResponse from "./response_objects/SettingsResponse";

export default class StompInbound {

    private stompClient: Client;

    private helloResponseSub: StompSubscription;
    private chordResponseSub: StompSubscription;
    private settingsResponseSub: StompSubscription;
    private startGameResponseSub: StompSubscription;

    constructor(stompClient: Client){
        this.stompClient = stompClient;
    }

    public onWebsocketError = (frame: any) => {
        console.log(frame)
    }

    public onStompError = (frame: any) => {
        console.log(frame)
    }

    public onDisconnect = (iframe: any) => {
        console.log(iframe);
    }

    public onHelloResponseHandler = (helloResponse: HelloResponse) => {
        console.log(helloResponse);
    }

    public onChordResponseHandler = (chordResponse: ChordResponse) => {
        console.log(chordResponse);
    }

    public onSettingsResponseHandler = (settingsResponse: SettingsResponse) => {
        console.log(settingsResponse);
    }

    public onStartGameResponseHandler = (chordSequence: StartGameResponse) => {
        console.log(chordSequence);
    }


    // subscription logic
    public subscribeHellResponse = (callback: (helloResponse: HelloResponse) => void) => {
        if (this.helloResponseSub) {
            this.helloResponseSub.unsubscribe();
        }
        this.helloResponseSub = this.stompClient.subscribe('/user/queue/hello', (response: any) => {
            let hello: HelloResponse = JSON.parse(response.body);
            callback(hello)
        });
    }

    public subscribeChordResponse = (callback: (chordResponse: ChordResponse) => void) => {
        if (this.chordResponseSub) {
            this.chordResponseSub.unsubscribe();
        }
        this.stompClient.subscribe('/user/queue/chord', (response: any) => {
            let chordResponse: ChordResponse = JSON.parse(response.body);
            callback(chordResponse);
        });
    }

    public subscribeSettingsResponse = (callback: (settingsResponse: SettingsResponse) => void) => {
        console.log("attempting to subscribe to /user/queue/settings")
        if (this.settingsResponseSub != null) {
            this.settingsResponseSub.unsubscribe();
        }
        this.stompClient.subscribe('/user/queue/settings', (response: any) => {
            let settings: SettingsResponse = JSON.parse(response.body);
            callback(settings);
        });
    }

    public subscribeStartGameResponse = (callback: (chordSeq: StartGameResponse) => void) => {
        if (this.startGameResponseSub) {
            this.startGameResponseSub.unsubscribe();
        }
        this.stompClient.subscribe('/user/queue/startgame', (response: any) => {
            let chordSeq: StartGameResponse = JSON.parse(response.body);
            callback(chordSeq);
        });
    }

}