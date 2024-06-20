import { Client, StompSubscription } from "@stomp/stompjs";
import ChordResponse from "./response_objects/ChordResponse";
import HelloResponse from "./response_objects/HelloResponse";
import StartGameResponse from "./response_objects/StartGameResponse";
import SettingsResponse from "./response_objects/SettingsResponse";
import CreateSessionResponse from "./response_objects/CreateSessionResponse";
import EndGameResponse from "./response_objects/EndGameResponse";
import EndSessionResponse from "./response_objects/EndSessionResponse";

export default class StompInbound {

    private stompClient: Client;

    private helloResponseSub: StompSubscription | null = null;
    private chordResponseSub: StompSubscription | null = null;
    private settingsResponseSub: StompSubscription | null = null;
    public startGameResponseSub: StompSubscription | null = null;
    private endGameResponseSub: StompSubscription | null = null;
    private createSessionResponseSub: StompSubscription | null = null;
    private endSessionResponseSub: StompSubscription | null = null;

    constructor(stompClient: Client){
        this.stompClient = stompClient;
    }

    // subscription logic
    public subscribeHellResponse = (callback: (helloResponse: HelloResponse) => void) => {
        if (this.helloResponseSub) {
            this.helloResponseSub.unsubscribe();
        }
        this.helloResponseSub = this.helloResponseSub = this.stompClient.subscribe('/user/queue/hello', (response: any) => {
            let hello: HelloResponse = JSON.parse(response.body);
            callback(hello)
        });
    }

    public subscribeChordResponse = (callback: (chordResponse: ChordResponse) => void) => {
        if (this.chordResponseSub) {
            this.chordResponseSub.unsubscribe();
        }
        this.chordResponseSub = this.stompClient.subscribe('/user/queue/chord', (response: any) => {
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
        this.startGameResponseSub = this.stompClient.subscribe('/user/queue/startgame', (response: any) => {
            let chordSeq: StartGameResponse = JSON.parse(response.body);
            callback(chordSeq);
        });
    }

    public subscribeEndGameResponse = (callback: (response: EndGameResponse) => void) => {
        if (this.endGameResponseSub) {
            this.endGameResponseSub.unsubscribe();
        }
        this.endGameResponseSub = this.stompClient.subscribe('/user/queue/endgame', (response: any) => {
            let parsedResponse: EndGameResponse = JSON.parse(response.body);
            callback(parsedResponse);
        });    
    }

    public subscribeCreateSessionResponse = (callback: (response: CreateSessionResponse) => void) => {
        if (this.createSessionResponseSub) {
            this.createSessionResponseSub.unsubscribe();
        }
        this.createSessionResponseSub = this.stompClient.subscribe('/user/queue/startsession', (response: any) => {
            let parsedResponse: CreateSessionResponse = JSON.parse(response.body);
            callback(parsedResponse);
        });    
    }

    public subscribeEndSessionResponse = (callback: (response: EndSessionResponse) => void) => {
        if (this.endSessionResponseSub) {
            this.endSessionResponseSub.unsubscribe();
        }
       this.endSessionResponseSub = this.stompClient.subscribe('/user/queue/endsession', (response: any) => {
            let parsedResponse: EndSessionResponse = JSON.parse(response.body);
            callback(parsedResponse);
        });    
    }

}