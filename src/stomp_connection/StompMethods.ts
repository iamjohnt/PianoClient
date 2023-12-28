import { Client } from "@stomp/stompjs";
import KeyboardToServerCommunicationInterface from "./KeyboardToServerInterface";

export default class StompMethods implements KeyboardToServerCommunicationInterface{

    private stompClient: Client;

    constructor() {
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
        console.log(gameSettings);
    }

    public startGameSession(): void {
        
    }

    public endGameSession(): void {
        
    }

    public setStompClient(client: Client) {
        this.stompClient = client;
    }


}