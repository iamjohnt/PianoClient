class StompConnection {

    stompURL = 'ws://localhost:8081/ws';
    stompDomain = 'ws://localhost:8080';
    stompBrokerPath = '/chordresponse';
    stompSendChordPath = '/chord'

    stompClient;

    connectStomp = () => {

        console.log("Attempting to connect...");

        this.stompClient = new StompJs.Client({
            brokerURL: this.stompURL
        });
        
        this.stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket:', error);
        };

        this.stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.stompClient.onConnect = (frame) => {
            // setConnected(true);
            console.log('Connected: ' + frame);
            // stompClient.subscribe('/topic/chord', (response) => {
            //     console.log(JSON.parse(response.body));
            // });
            this.stompClient.subscribe('/topic/greetings', (response) => {
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
    
    sendHello = () => {
        this.stompClient.publish({
            destination: "/app/hello",
            body: JSON.stringify(
                {
                    'name': $("#name").val(),
                    'age':5
                }
            )
        });
    }

    sendChord = () => {
        let chord = {
            "chord": [1,2,3]
        };
    
        this.stompClient.publish({
            destination: "/app/chord",
            body: JSON.stringify(chord)
        });
    }
}

export {StompConnection};