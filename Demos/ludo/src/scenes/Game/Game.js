// w- 1080 h- 1920
// yudiz-yash

import { Filters, GameObjects, Math as math, Scene } from 'phaser';
import { Pawn } from '../../prefabs/Pawn';
import { boardPawnPos, diceButtonPositions, getColorByIndex, modeFour_1, modeFour_2, modeFour_3, modeFour_4 } from '../../scripts/constants';
import { DiceButton } from '../../prefabs/DiceButton';
// import { pawnScale } from '../../scripts/constants';

export class Game extends Scene {
    constructor() {
        super('game');

        this.board = null;

        this.eachPlayer = [];

        this.players = 0;

        this.mode = null;

        this.settingData = null;
    }

    init(data) {
        this.players = data.players || 4;
        this.boardPawnPos = boardPawnPos;
        this.mode = ['two', 'four'].includes(data.mode) ? data.mode == "two" ? 'Two' : "Four" : "Four";

        if (this.mode == "Four") {
            this.settingData = [modeFour_1, modeFour_2, modeFour_3, modeFour_4];
        }
    }

    preload() {
        this.load.image('board', import.meta.env.VITE_BASE_PATH + 'assets/images/ludo_temp.png');

        this.load.image('redPawn', import.meta.env.VITE_BASE_PATH + "assets/images/pawns/red.png");
        this.load.image('greenPawn', import.meta.env.VITE_BASE_PATH + "assets/images/pawns/green.png");
        this.load.image('yellowPawn', import.meta.env.VITE_BASE_PATH + "assets/images/pawns/yellow.png");
        this.load.image('bluePawn', import.meta.env.VITE_BASE_PATH + "assets/images/pawns/blue.png");

        this.load.image('1',import.meta.env.VITE_BASE_PATH + "assets/images/1.png");
        this.load.image('2',import.meta.env.VITE_BASE_PATH + "assets/images/2.png");
        this.load.image('3',import.meta.env.VITE_BASE_PATH + "assets/images/3.png");
        this.load.image('4',import.meta.env.VITE_BASE_PATH + "assets/images/4.png");
        this.load.image('5',import.meta.env.VITE_BASE_PATH + "assets/images/5.png");
        this.load.image('6',import.meta.env.VITE_BASE_PATH + "assets/images/6.png");
    }

    create() {
        this.board = this.add.image(540, 960, 'board');
        this.board.setOrigin(0.5, 0.5).setScale(1.09);
        const pawn = new Pawn(this, 792, 1199, 'redPawn');
        this.add.existing(pawn);


        if (this.mode == "Four") {
            for (let i = 0; i < this.players; i++) {
                const playerData = {};
                playerData.playerNumber = this.settingData[i].playerNumber;
                playerData.pawns = [];
                playerData.color = this.settingData[i].color;
                playerData.dice = -1;
                playerData.pawnsLeft = 4;
                playerData.start = this.settingData[i].start;
                playerData.goto = this.settingData[i].goto;
                playerData.entry = this.settingData[i].entry;
                playerData.availablePawns = [];

                for (let k = 0; k < 4; k++) {
                    const pawn = new Pawn(
                        this,
                        this.settingData[i].homePositions[k].x,
                        this.settingData[i].homePositions[k].y,
                        this.settingData[i].color + "Pawn",
                    )
                    playerData.pawns.push(pawn);
                }
                new DiceButton(
                    this,
                    diceButtonPositions[i].containerX,
                    diceButtonPositions[i].containerY,
                    40,
                    50,
                    playerData.playerNumber,
                    diceButtonPositions[i].color
                );

                this.eachPlayer.push(playerData);

            }

        }
        console.log(this.eachPlayer);

        // this.add.sprite(80,50,'1').setOrigin(0.5,0.5).setInteractive();

        // this.p1Button = this.add.container(80,1550);
        // const box = this.add.graphics();
        // box.fillStyle(0xffffff,1);
        // box.fillRoundedRect(0,0,180,100,12);
        // this.p1Button.add(box);

        // let text = this.add.text(40,50,`P\n1`,{fontFamily:"Vardana",color:"white",backgroundColor:"red",fontSize:"29px",padding:{x:20,y:10}}).setOrigin(0.5,0.5);
        // this.p1Button.add(text);

        // let i = 0;
        // const call = () => {
        //     this.time.delayedCall(50,() => {
        //         this.tweens.add({
        //             targets:pawn,
        //             x: boardPawnPos[i].x,
        //             y: boardPawnPos[i].y,
        //             duration: 50,
        //         })
        //         // pawn.setPosition(boardPawnPos[i].x,boardPawnPos[i].y);
        //         i = (i+1) % 52
        //         call();
        //     })
        // }
        // call();


    }
}