import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale,Game } from 'phaser';
import GameOver from './scenes/GameOver';
import Night from './scenes/Night';
import Character from './scenes/Character';
import InfiniteJump from './scenes/InfiniteJump';
import SuperMario from './scenes/SuperMario';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 480, //480
    height: 640, //640
    parent: 'game-container',
    backgroundColor: '#777',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y : 9.81
            },
            debug: true,
        }
    },
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        InfiniteJump,
        SuperMario,
        Character,
        MainGame,
        GameOver,
        Night,
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
