export default class LessonChordsManager {

    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public populateLessonChords = (chordArray: Array<Set<number>>) => {
        let chordContainer = this.scene.add.container(0, 0);
    }
}