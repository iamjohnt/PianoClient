import { GameObjects } from "phaser";
import StompService from "../../../stomp_connection/StompService";
import GameContext from "../../GameContext";
import Pos from "../../ObjectPositions";
import KeyboardConnection from "../../../keyboard_connection/KeyboardConnection";

export default class GameScene extends Phaser.Scene{

    private context: GameContext;
    private logo: GameObjects.Sprite;
    private isIntroAnimationDone: boolean = true;
    private basePath: string = 'assets/welcome/';

    constructor() {
        super({ key: 'welcome' });
        this.context = new GameContext();
    }

    // public init = () => {}

    public preload = () => {
        this.load.image('welcome_background', 'assets/welcome/welcome_background.png')
        this.load.image('click_text', 'assets/welcome/click_anywhere_text.png')
        this.load.image('glint_s', 'assets/welcome/glint_S.png')
        this.load.image('glint_m', 'assets/welcome/glint_M.png')
        this.load.image('glint_l', 'assets/welcome/glint_L.png')
        this.load.image('glint', 'assets/welcome/glint_square.png')
        this.load.spritesheet('logo', 'assets/welcome/logo_spritesheet.png', {
            frameWidth: 685,
            frameHeight: 600
        })
        this.load.image('transparent', this.basePath + "transparent.png")
    };
    
    public create = () => {
        this.spawnTransparentNextSceneButton();
        this.spawnBackground(500);
        this.spawnLogo(700)
        this.spawnGlint(700)
        this.animateLogoGlintOnce(1500)
        this.loopAnimateLogoGlint(4000)
        this.spawnWelcomeText(2500)
    };


    private spawnBackground = (spawnTime: number) => {

        let background = this.add.image(0, 0, 'welcome_background').setOrigin(0, 0).setAlpha(0)

        this.time.addEvent({
            delay: spawnTime,
            callbackScope: this,
            loop: false,
            callback: () => {
                this.tweens.add({
                    targets: background,
                    alpha: 1,
                    duration: 250,
                })
            }
        });
    }

    private spawnLogo = (spawnTime: number) => {

        this.logo = this.add
            .sprite(Pos.LOGO_CENTER_X(), Pos.LOGO_CENTER_Y() - Pos.UNIT(), 'logo')
            .setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setScale(1.25, 1.25)

        // create sprite animation
        this.anims.create({
            key: 'anim_logo',
            frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 9 }),
            frameRate: 15,
            repeat: 0,
        })

        this.time.addEvent({
            delay: spawnTime,
            callbackScope: this,
            loop: false,
            callback: () => {
                this.tweens.add({
                    targets: this.logo,
                    alpha: 1,
                    y: Pos.LOGO_CENTER_Y(),
                    ease: Phaser.Math.Easing.Quadratic.Out,
                    duration: 500            
                })
            }
        });
    }

    private animateLogoGlintOnce = (beginTime: number) => {
        this.time.addEvent({
            delay: beginTime,
            callbackScope: this,
            loop: false,
            callback: () => {
                this.logo.playReverse('anim_logo')
            }
        });
    }

    private loopAnimateLogoGlint = (beginTime: number) => {
        this.time.addEvent({
            delay: beginTime,
            callbackScope: this,
            loop: true,
            callback: () => {
                this.logo.playReverse('anim_logo')
            }
        });
    }

    private spawnWelcomeText = (spawnTime: number) => {

        let text = this.add
                .image(Pos.WELCOME_MSG_CENTER_X(), Pos.WELCOME_MSG_CENTER_Y(), 'click_text')
                .setOrigin(0.5, 0.5)
                .setAlpha(0)

        let pulseText = () => {
            this.isIntroAnimationDone = true;
            this.tweens.add({
                targets: text,
                alpha: {
                    value: 0.3,
                    duration: 750,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                }
            })
        }

        let fadeInText = () => {
            this.tweens.add({
                targets: text,
                alpha: 1,
                onComplete: pulseText
            })       
        }

        this.time.addEvent({
            delay: spawnTime,
            callbackScope: this,
            loop: false,
            callback: fadeInText
        });
    }

    private spawnGlint = (spawnTime: number) => {

        let g = this.add.image(Pos.GLINT_CENTER_X(), Pos.GLINT_CENTER_Y() - Pos.UNIT(), 'glint').setAlpha(0).setOrigin(.5, .5)

        this.time.addEvent({
            delay: spawnTime,
            callbackScope: this,
            loop: false,
            callback: () => {
                this.tweens.add({
                    targets: g,
                    alpha: 1,
                    y: Pos.GLINT_CENTER_Y(),
                    ease: Phaser.Math.Easing.Quadratic.Out,
                    duration: 500            
                })            
            }
        });
    }

    private spawnTransparentNextSceneButton = () => {

        let goNextScene = () => {
            if (this.isIntroAnimationDone) {

                // init stomp
                // let stompService = new StompService('wss://stomp.supersightread.com/ws');
                let url: string = import.meta.env.VITE_STOMP_SERVER_URL;
                let stompService = new StompService(url);
                this.context.stompService = stompService;
                stompService.setOnConnect(frame => {
                    console.log(frame)
                    this.scene.start('settings', this.context)
                })
                stompService.connectStomp();

                // init keyboard
                let keyboard = new KeyboardConnection()
                keyboard.connectMidi()
                this.context.keyboardConnection = keyboard;

            } else {
                console.info('Intro animation is not complete yet, so cannot go to next screen')
            }
        }

        this.add.image(0, 0, 'transparent')
            .setOrigin(0,0)
            .setAlpha(1)
            .setInteractive()
            .on('pointerdown', goNextScene);
    }

}