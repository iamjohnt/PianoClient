import { GameSettings } from "../game/GameSettings";
import KeyboardConnection from "../keyboard_connection/KeyboardConnection";
import StompService from "../stomp_connection/StompService";
import ObjectPositions from "./ObjectPositions";
import PlaySceneContext from "./scenes/play/PlaySceneContext";

export default class GameContext {

    public objectPos: ObjectPositions = new ObjectPositions();
    public stompService: StompService | null = null;
    public keyboardConnection: KeyboardConnection | null = null;
    public gameSettings: GameSettings | null = null;
    public gameState: PlaySceneContext | null = null;

}