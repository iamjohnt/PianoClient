import { Client } from "@stomp/stompjs";
import StompConnection from "./StompConnection";

export default class StompOutbound {

    private stompClient: Client;

    constructor(stompClient: Client){
        this.stompClient = stompClient;
    }
    
    public sendHello = (name: string, age: string) => {
        this.stompClient.publish({
            destination: "/app/hello",
            body: JSON.stringify(
                {
                    'name': name,
                    'age': age
                }
            )
        });
    }

    public sendChord = (chordSet: any) => {
        console.info("sending chord to stomp server...");
        let chordArray = Array.from(chordSet);
        let myChord = {
            "chord": chordArray
        }

        this.stompClient.publish({
            destination: "/app/chord",
            body: JSON.stringify(myChord)
        });
    }

    public sendGameSettings = (gameSettings: any) => {
        console.info("sending game settings to stomp server...");

        this.stompClient.publish({
            destination: "/app/settings",
            body: JSON.stringify(gameSettings)
        });
    }

    public startGameSession = (startSession: string) => {
        this.stompClient.publish({
            destination: "/app/startsession",
            body: JSON.stringify({startSession})
        });
    }

    public endGameSession = (endSession: string) => {
        this.stompClient.publish({
            destination: "/app/endsession",
            body: JSON.stringify({endSession})
        });
    }

    public startGame = (startGame: string) => {
        this.stompClient.publish({
            destination: "/app/startgame",
            body: JSON.stringify({startGame})
        });
    }

    public endGame = (endGame: string) => {
        this.stompClient.publish({
            destination: "/app/endgame",
            body: JSON.stringify({endGame})
        });
    }
}