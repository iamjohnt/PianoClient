import ChordObservable from "../keyboard_connection/ChordObservable";

// to be passed as argument to a Scene - from there the will register itself 
export default class PhaserChordSpawner implements ChordObservable {

    private scene: Phaser.Scene;

    constructor() {
    }

    public onUpdate(chord: Set<number>): void {
        this.scene.add.text(200, 200, 'hello world this is a chord!')
    }

    public addScene = (scene: Phaser.Scene) => {
        this.scene = scene;
    }

}