import { GameSettings } from "../game/GameSettings";

export default interface KeyboardToServerCommunicationInterface {

    sendHello(name: string, age: string): void

    sendChord(chord: Set<number>): void;

    sendGameSettings(gameSettings: GameSettings): void;

    startGameSession(startSessionString: string): void;

    endGameSession(endSessionString: string): void;

}