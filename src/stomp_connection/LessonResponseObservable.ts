import StartGameResponse from "./response_objects/StartGameResponse";

export default interface LessonResponseObservable {

    onUpdate(startGameResponse: StartGameResponse): void
    
}