import ChordResponse from "./response_objects/ChordResponse";

export default interface ChordResponseObservable {

    onUpdate(chordResponse: ChordResponse): void

}