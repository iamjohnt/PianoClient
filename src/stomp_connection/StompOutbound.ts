import StompConnection from "./StompConnection";

export default class StompOutbound {

    private stompConnection: StompConnection;

    constructor(connection: StompConnection){
        this.stompConnection = connection;
    }
    
    public sendHello = (name: string, age: string) => {
        this.stompConnection.stompClient.publish({
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

        this.stompConnection.stompClient.publish({
            destination: "/app/chord",
            body: JSON.stringify(myChord)
        });
    }

    public sendGameSettings = (gameSettings: any) => {
        console.info("sending game settings to stomp server...");

        this.stompConnection.stompClient.publish({
            destination: "/app/settings",
            body: JSON.stringify(gameSettings)
        });
        console.log(gameSettings);
    }

    public startGameSession = (startSession: string) => {
        this.stompConnection.stompClient.publish({
            destination: "/app/startsession",
            body: JSON.stringify({startSession})
        });
    }

    public endGameSession = (endSession: string) => {
        this.stompConnection.stompClient.publish({
            destination: "/app/endsession",
            body: JSON.stringify({endSession})
        });
    }

    public startGame = (startGame: string) => {
        this.stompConnection.stompClient.publish({
            destination: "/app/startgame",
            body: JSON.stringify({startGame})
        });
    }

    public endGame = (endGame: string) => {
        this.stompConnection.stompClient.publish({
            destination: "/app/endgame",
            body: JSON.stringify({endGame})
        });
    }
}