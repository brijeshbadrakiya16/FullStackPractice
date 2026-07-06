import { Game as MainGame } from './scenes/Game/Game';
import { GameFinish } from './scenes/GameFinish/GameFinish';
import { AUTO, Game, Scale } from 'phaser';
import StartScene from './scenes/StartGame/StartGame';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1080,
    height: 1920,
    parent: 'game-container',
    backgroundColor: '#333',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainGame,
        StartScene,
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
