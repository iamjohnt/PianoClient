import * as StompJsTypes from "@stomp/stompjs"

export class StompConnection {

    stompURL = 'ws://localhost:8081/ws';
    stompDomain = 'ws://localhost:8080';
    stompBrokerPath = '/chordresponse';
    stompSendChordPath = '/chord'

    stompClient: any;

    connectStomp = () => {

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

    disconnect = () => {
        // this.stompClient.deactivate();
        // setConnected(false);
        // console.log("Disconnected");
    }
    
    sendHello = (name: string, age: string) => {
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

    sendChord = (chordSet: any) => {
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

    sendGameSettings = (gameSettings: any) => {
        console.info("sending game settings to stomp server...");

        this.stompClient.publish({
            destination: "/app/settings",
            body: JSON.stringify(gameSettings)
        });
        console.log(gameSettings);
    }
}