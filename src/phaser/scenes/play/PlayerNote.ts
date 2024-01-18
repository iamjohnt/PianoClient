import ObjectPositions from "../../ObjectPositions";

export default class PlayerNote extends Phaser.GameObjects.Sprite{

    private isActive: boolean = false;
    public isOffset: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    
        scene.add.existing(this).setOrigin(0, .5);
        this.setAlpha(0);
    }
    
    public fadeIn = (onCompleteCallback?: Function) => {
        this.scene.tweens.add({
          targets: this,
          alpha: .3,
          duration: 75,
          ease: 'Linear',
          onComplete: onCompleteCallback
        });
    }

    public fadeOut = (onCompleteCallback?: Function) => {
        this.scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 75,
          ease: 'Linear',
          onComplete: onCompleteCallback
        });
    }

    public goRight = (onCompleteCallback?: Function) => {
        this.scene.tweens.add({
            targets: this,
            x: ObjectPositions.PLAYER_NOTE_LEFT_X(),
            duration: 75,
            ease: 'Linear',
            onComplete: onCompleteCallback
        });
    }

    public goLeft = (onCompleteCallback?: Function) => {
        this.scene.tweens.add({
            targets: this,
            x: ObjectPositions.PLAYER_NOTE_LEFT_X() - (ObjectPositions.UNIT() * .75),
            duration: 125,
            ease: 'Quint.easeIn',
            onComplete: onCompleteCallback
        });
    }

    public getIsActive = (): boolean => {
        return this.isActive;
    }

    public setIsActive = (active: boolean) => {
        this.isActive = active;
    }
    
}