import DistributeCards from './scenes/distributeCards';
import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale,Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#777777',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: { 
            gravity: { y: 400 }, // Increased gravity a bit for snappier jumping
            debug: false 
        }
    },
    scene: [
        MainGame,
        DistributeCards
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
