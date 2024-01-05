import StompConnection from "./StompConnection";
import ChordResponse from "./response_objects/ChordResponse";
import HelloResponse from "./response_objects/HelloResponse";
import StartGameResponse from "./response_objects/StartGameResponse";

export default class StompInbound {

    private stompConnection: StompConnection;

    constructor(connection: StompConnection){
        this.stompConnection = connection;
    }

    public subscribeHelloResponse = (callback: (hello: HelloResponse) => void) => {
        this.stompConnection.stompClient.subscribe('/user/queue/hello', (response: any) => {
            console.log("response received from stomp server")
            let hello: HelloResponse = JSON.parse(response.body);
            console.log(hello.content + "ayylmao")
            callback(hello);
        });
    }

    public subscribeChordResponse = (callback: (chordResponse: ChordResponse) => void) => {
        this.stompConnection.stompClient.subscribe('/user/queue/chord', (response: any) => {
            console.log("response received from stomp server")
            console.log(JSON.parse(response.body));
            callback(response)
        });
    }

    public subscribeSettingsResponse = (callback: Function) => {
        this.stompConnection.stompClient.subscribe('/user/queue/settings', (response: any) => {
            console.log(JSON.parse(response.body));
            callback(response);
        });
    }

    public subscribeStartGameResponse = (callback: (chordSequence: StartGameResponse) => void) => {
        this.stompConnection.stompClient.subscribe('/user/queue/startgame', (response: any) => {
            let chordSequence: StartGameResponse = JSON.parse(response.body);
            callback(chordSequence)
        });
    }

}