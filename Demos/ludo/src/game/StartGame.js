import { Game as MainGame } from './scenes/Game';
import { GameFinish } from './scenes/GameFinish';
import { AUTO, Game, Scale } from 'phaser';
import StartScene from './scenes/StartScene';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 2048,
    height: 1536,
    parent: 'game-container',
    backgroundColor: '#333',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        StartScene,
        MainGame,
        GameFinish,
    ],
    dom: {
        createContainer: true,
    },
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
