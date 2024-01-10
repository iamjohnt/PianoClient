import { GameSettings } from "../game/GameSettings";
import KeyboardConnection from "../keyboard_connection/KeyboardConnection";
import StompService from "../stomp_connection/StompService";
import ObjectPositions from "./ObjectPositions";
import GameState from "./scenes/play/GameState";
import { KeyboardType } from "../game/Enum";

export default class GameContext {

    public objectPos: ObjectPositions = new ObjectPositions();
    public stompService: StompService;
    public keyboardConnection: KeyboardConnection;
    public settings: GameSettings;
    public gameState: GameState;
    public keyboardType: KeyboardType;

}