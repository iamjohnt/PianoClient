const stompURL = 'ws://localhost:8081/ws';
const stompDomain = 'ws://localhost:8080';
const stompBrokerPath = '/chordresponse';
const stompSendChordPath = '/chord'

let stompClient;

function connect() {

    console.log("Attempting to connect...");

    stompClient = new StompJs.Client({
        brokerURL: stompURL
    });
      
    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket:', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    stompClient.onConnect = (frame) => {
        // setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', (greeting) => {
            console.log(JSON.parse(greeting.body).content);
        });
    };

    stompClient.activate();
}

function disconnect() {
    // stompClient.deactivate();
    // setConnected(false);
    // console.log("Disconnected");
}

function sendHello() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': $("#name").val()})
    });
}

export {connect, disconnect, sendHello};