import Phaser from 'phaser';
import config from './phaser/config';
import PlayScene from './phaser/scenes/play/PlayScene';
import WelcomeScene from './phaser/scenes/welcome/WelcomeScene'
import SettingsScene from './phaser/scenes/settings/SettingsScene';
import HandScene from './phaser/scenes/hand/HandScene';
import PlaySceneVirtualKeyboard from './phaser/scenes/play/PlaySceneVirtualKeyboard';
import KeyboardModeScene from './phaser/scenes/keyboard_mode/KeyboardModeScene';

class EntryPoint {

    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(
            Object.assign(config, {
                scene: [WelcomeScene, SettingsScene, PlayScene, HandScene, PlaySceneVirtualKeyboard, KeyboardModeScene]
            })
        );
    }
    
    public goToFirstScene = () => [
        this.game.scene.start('WelcomeScene')
    ]
}

console.log("stomp server url: " + import.meta.env.VITE_STOMP_SERVER_URL)

const entry = new EntryPoint();
entry.goToFirstScene()