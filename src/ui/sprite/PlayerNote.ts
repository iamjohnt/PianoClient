export default class PlayerNote extends Phaser.GameObjects.Sprite{

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    
        scene.add.existing(this);
        this.setAlpha(0);
    }
    
    public fadeIn = (onCompleteCallback?: Function) => {
        this.scene.tweens.add({
          targets: this,
          alpha: 1,
          duration: 50,
          ease: 'Linear',
          onComplete: onCompleteCallback
        });
    }

    public fadeOut = (onCompleteCallback?: Function) => {
        this.scene.tweens.add({
          targets: this,
          alpha: 0,
          duration: 50,
          ease: 'Linear',
          onComplete: onCompleteCallback
        });
    }
    
}