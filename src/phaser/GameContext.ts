import { GameSettings } from "../game/GameSettings";
import KeyboardConnection from "../keyboard_connection/KeyboardConnection";
import StompService from "../stomp_connection/StompService";
import ObjectPositions from "./ObjectPositions";
import GameState from "./scenes/play/GameState";
import { KeyboardType } from "../game/Enum";

export default class GameContext {

    public objectPos: ObjectPositions = new ObjectPositions();
    public stompService: StompService | null = null;
    public keyboardConnection: KeyboardConnection | null = null;
    public settings: GameSettings | null = null;
    public gameState: GameState | null = null;
    public keyboardType: KeyboardType | null = null;

}