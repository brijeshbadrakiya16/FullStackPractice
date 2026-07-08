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

        this.turn = 0;

        this.pawnTest = null;

        this.intervals = [];

        this.intervalPawns = [];
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

        this.load.image('1', import.meta.env.VITE_BASE_PATH + "assets/images/dice/1.png");
        this.load.image('2', import.meta.env.VITE_BASE_PATH + "assets/images/dice/2.png");
        this.load.image('3', import.meta.env.VITE_BASE_PATH + "assets/images/dice/3.png");
        this.load.image('4', import.meta.env.VITE_BASE_PATH + "assets/images/dice/4.png");
        this.load.image('5', import.meta.env.VITE_BASE_PATH + "assets/images/dice/5.png");
        this.load.image('6', import.meta.env.VITE_BASE_PATH + "assets/images/dice/6.png");

        this.load.image('dice1', import.meta.env.VITE_BASE_PATH + "assets/images/dice/sprite-1-1.png");
        this.load.image('dice2', import.meta.env.VITE_BASE_PATH + "assets/images/dice/sprite-1-2.png");
        this.load.image('dice3', import.meta.env.VITE_BASE_PATH + "assets/images/dice/sprite-1-3.png");
        this.load.image('dice4', import.meta.env.VITE_BASE_PATH + "assets/images/dice/sprite-2-1.png");
        this.load.image('dice5', import.meta.env.VITE_BASE_PATH + "assets/images/dice/sprite-2-2.png");
        this.load.image('dice6', import.meta.env.VITE_BASE_PATH + "assets/images/dice/sprite-2-3.png");
    }

    create() {
        this.board = this.add.image(540, 960, 'board');
        this.board.setOrigin(0.5, 0.5).setScale(1.09);

        // this.pawnTest = new Pawn(this, 576, 960, 'redPawn');
        // this.pawnTest = new Pawn(this, 592, 960, 'redPawn').setScale(0.15);
        // this.pawnTest = new Pawn(this, 608, 960, 'redPawn').setScale(0.15);
        // this.pawnTest = new Pawn(this, 624, 960, 'redPawn').setScale(0.15);

        // this.pawnTest = new Pawn(this, 516 , 894, 'redPawn').setScale(0.15);
        // this.pawnTest = new Pawn(this, 532 , 894, 'redPawn').setScale(0.15);
        // this.pawnTest = new Pawn(this, 548 , 894, 'redPawn').setScale(0.15);
        // this.pawnTest = new Pawn(this, 564 , 894, 'redPawn').setScale(0.15);


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
                playerData.tilePositions = this.settingData[i].tilePositions;

                for (let k = 0; k < 4; k++) {
                    const pawn = new Pawn(
                        this,
                        this.settingData[i].homePositions[k].x,
                        this.settingData[i].homePositions[k].y,
                        this.settingData[i].color + "Pawn",
                        this.settingData[i].colorNumber,
                        playerData.playerNumber,
                        k
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

        // this.levitate();
    }

    diceRolled(number, ref) {
        console.log(number);
        if (number != 6 && this.eachPlayer[this.turn].availablePawns.length == 1) {
            const pawn = this.eachPlayer[this.turn].availablePawns[0];
            this.movePawn(pawn, pawn.pos, number, this.turn, number, ref); 
        } else if (number == 6 && this.eachPlayer[this.turn].availablePawns.length >= 0) {
            this.eachPlayer[this.turn].pawns.forEach((pawn) => {
                // pawn.filters.external.addGlow(pawn.colorNumber);
                this.levitate(pawn);
                pawn.on('pointerdown', () => {
                    this.intervals.forEach(x => clearInterval(x));
                    this.intervalPawns.forEach(x => {
                        // console.log(x,x.pos,this.boardPawnPos[x.pos]);
                        if (x.pos != -1) {
                            x.setX(this.boardPawnPos[x.pos].x);
                            x.setY(this.boardPawnPos[x.pos].y);
                        } else {
                            x.setX(this.settingData[x.playerNumber - 1].homePositions[x.pawnNumber].x);
                            x.setY(this.settingData[x.playerNumber - 1].homePositions[x.pawnNumber].y);
                        }
                        x.setScale(0.2, 0.2);
                        // console.log(x);
                    });
                    this.intervalPawns = [];
                    this.eachPlayer[(this.turn + 4) % 4].pawns.forEach((pawn) => {
                        pawn.removeAllListeners('pointerdown');
                    })
                    // console.log(pawn,number,this.turn-1);
                    this.movePawn(pawn, pawn.pos, number, (this.turn + 4) % 4, number, ref);
                    console.log("Reached ")
                });
                // pawn.on('pointerdown',(pawn,number) => this.movePawn(pawn,number,this.turn), this);
            });
        } else if (number != 6 && this.eachPlayer[this.turn].availablePawns.length > 0) {
            this.eachPlayer[this.turn].availablePawns.forEach((pawn) => {
                // pawn.filters.external.addGlow(pawn.colorNumber);
                this.levitate(pawn);
                pawn.on('pointerdown', () => {
                    this.intervals.forEach(x => clearInterval(x));
                    this.intervalPawns.forEach(x => {
                        // console.log(x,x.pos,this.boardPawnPos[x.pos]);
                        if (x.pos != -1) {
                            this.boardPawnPos[x.pos]?.x ?? x.setX(this.boardPawnPos[x.pos].x);
                            this.boardPawnPos[x.pos]?.y ?? x.setY(this.boardPawnPos[x.pos].y);
                        } else {
                            x.setX(this.settingData[x.playerNumber - 1].homePositions[x.pawnNumber].x);
                            x.setY(this.settingData[x.playerNumber - 1].homePositions[x.pawnNumber].y);
                        }
                        x.setScale(0.2, 0.2);
                        // console.log(x);
                    });
                    this.intervalPawns = [];
                    this.eachPlayer[(this.turn + 4) % 4].pawns.forEach((pawn) => {
                        pawn.removeAllListeners('pointerdown');
                        // pawn.filters.external.clear();
                    })
                    // console.log(pawn,number,this.turn-1);
                    this.movePawn(pawn, pawn.pos, number, (this.turn + 4) % 4, number, ref);
                    console.log("Reached ")
                });
                // pawn.on('pointerdown',(pawn,number) => this.movePawn(pawn,number,this.turn), this);
            });
        } else {
            this.movePawn(null, null, 0, 0, 0, ref);
        }
    }

    // movePawn(pawn, number, turn) {
    //     this.eachPlayer[this.turn].pawns.forEach((pawn) => {
    //         pawn.off('pointerdown');
    //     })
    //     this.call(pawn, pawn.pos, number, this.eachPlayer[turn].playerNumber);
    //     pawn.filters.external.clear();
    //     console.log("Reached ")
    // }

    // i = currentPosition of pawn
    movePawn(pawn, i, number, playerNumber, startNumber, ref) {
        if (number == 0) {
            startNumber != 6 ? this.turn = (this.turn + 1) % 4 : null;
            ref.wait = false;
            return;
        }
        // console.log(pawn, i, number, playerNumber);
        if (i == -1) {
            i = this.eachPlayer[playerNumber].start;
            this.eachPlayer[playerNumber].availablePawns.push(pawn);
            number = 0;
        } else if (playerNumber == 1 && pawn.pos == 51 && number != 0) {
            i = pawn.goto;
        } else if ((i + 1) % 52 == pawn.entry + 1 && number != 0) {
            i = pawn.goto;
        } else if (number != 0) {
            i = (i + 1) % 52
        }
        number--;
        this.tweens.add({
            targets: pawn,
            x: this.boardPawnPos[i].x,
            y: this.boardPawnPos[i].y,
            duration: 400,
            ease: "Expo.inOut",
            // ease: "Expo.easeOut",
        });
        pawn.pos = i;
        if (!(number <= 0)) {
            this.time.delayedCall(400, () => {
                this.movePawn(pawn, pawn.pos, number, playerNumber, startNumber, ref);
            }, null, this);
        } else {
            this.time.delayedCall(400, () => {
                startNumber != 6 ? this.turn = (this.turn + 1) % 4 : null;
                ref.wait = false
            }, null, this);
        }
    }

    levitate(pawn) {
        this.intervalPawns.push(pawn);
        const x = pawn.x || this.boardPawnPos[pawn.pos].x;
        const y = pawn.y || this.boardPawnPos[pawn.pos].y;
        let i = 0;
        let d = true;
        const positions = [{ y: y, scale: 0.2 }, { y: y - 3, scale: 0.21 }, { y: y - 6, scale: 0.22 }]
        this.intervals.push(setInterval((pawnTest) => {
            this.tweens.add({
                targets: pawnTest,
                y: positions[i].y,
                scaleX: positions[i].scale,
                scaleY: positions[i].scale,
                duration: 180,
            });
            if (d) {
                i++;
            } else {
                i--;
            }
            if (i > 2) {
                d = false;
                i = 2;
            } else if (i < 0) {
                d = true;
                i = 0;
            }
        }, 180, pawn));
    }
}