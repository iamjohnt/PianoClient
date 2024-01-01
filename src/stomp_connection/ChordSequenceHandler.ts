import StartGameResponse from "./response_objects/StartGameResponse";

export default interface ChordSequenceHandler {

    handleChordSequence(startGameResponse: StartGameResponse): void
    
}