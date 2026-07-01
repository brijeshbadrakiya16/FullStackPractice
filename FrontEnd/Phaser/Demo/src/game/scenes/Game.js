// w- 1024 h- 768

// stake: 50. pot: 50 * players

// Fold Call-2xbetAmount Raise-4xbetAmount

// 

import { GoogleGenAI, Modality } from "@google/genai";
import { Filters, GameObjects, Math as math, Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');

        this.cards = [
            'ace_of_spades.png', '2_of_spades.png', '3_of_spades.png', '4_of_spades.png', '5_of_spades.png', '6_of_spades.png', '7_of_spades.png', '8_of_spades.png', '9_of_spades.png', '10_of_spades.png', 'jack_of_spades2.png', 'queen_of_spades2.png', 'king_of_spades2.png',
            'ace_of_hearts.png', '2_of_hearts.png', '3_of_hearts.png', '4_of_hearts.png', '5_of_hearts.png', '6_of_hearts.png', '7_of_hearts.png', '8_of_hearts.png', '9_of_hearts.png', '10_of_hearts.png', 'jack_of_hearts2.png', 'queen_of_hearts2.png', 'king_of_hearts2.png',
            'ace_of_diamonds.png', '2_of_diamonds.png', '3_of_diamonds.png', '4_of_diamonds.png', '5_of_diamonds.png', '6_of_diamonds.png', '7_of_diamonds.png', '8_of_diamonds.png', '9_of_diamonds.png', '10_of_diamonds.png', 'jack_of_diamonds2.png', 'queen_of_diamonds2.png', 'king_of_diamonds2.png',
            'ace_of_clubs.png', '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', '5_of_clubs.png', '6_of_clubs.png', '7_of_clubs.png', '8_of_clubs.png', '9_of_clubs.png', '10_of_clubs.png', 'jack_of_clubs2.png', 'queen_of_clubs2.png', 'king_of_clubs2.png',
        ]
        this.cards = math.RND.shuffle(this.cards);

        // this.selfCardsNames = null;
        // this.opponentCardsNames = null;

        this.selfCardsNames = (() => {
            let temp = [];
            for (let i = 0; i < 3; i++) {
                let card = math.RND.pick(this.cards);
                temp.push(card);
                this.cards = math.RND.shuffle(this.cards);
                let index = this.cards.indexOf(card);
                this.cards = this.cards.slice(0, index).concat(this.cards.slice(index + 1));
            }
            // console.log("My Cards : ",temp.join(' ,'));
            return [...temp];
        })();

        this.opponentCardsNames = (() => {
            let temp = [];
            for (let i = 0; i < 3; i++) {
                let card = math.RND.pick(this.cards);
                temp.push(card);
                this.cards = math.RND.shuffle(this.cards);
                let index = this.cards.indexOf(card);
                this.cards = this.cards.slice(0, index).concat(this.cards.slice(index + 1));
            }
            // console.log("Opponent Cards : ",temp.join(' ,'));
            return [...temp];
        })();


        this.isCardsDistributed = false;
        this.cardBack1 = null;

        this.selfCards = [];
        this.opponentCards = [];

        this.seen = false;

        this.selfSee = null;

        this.selfMoney = 10000;
        this.selfMoneyText = null;
        this.opponentMoney = 10000;
        this.opponentMoneyText = null;
        this.playingMessage = null;

        this.stack = 50;
        this.pot = 0;

        this.selfMultiplexer = 1;

        this.selfCall = null;
        this.selfFold = null;
        this.selfRaise = null;
        this.selfShow = null;

        this.turn = 0; // 0 -> self and 1 -> opponent and -1 -> Game Has Been Ended...
        this.canRestart = false;
        this.restart = null;

        this.session = null;
        this.audioContext = null;
        this.audioChunks = [];
        this.bufferSource = null;

        this.replayAudio = null;
        this.winData = null;
    }

    preload() {
        this.load.image('cardBack', "assets/card_back4.png");
        // this.opponentCardsNames.forEach((x) => {
        //     this.load.image(x, `assets/cards/${x}`);
        // });
    }

    create() {
        this.earlyCall();

        this.cardBack1 = this.add.group({
            classType: GameObjects.Image,
            key: "cardBack",
            frameQuantity: 6,
            active: true,
            visible: true,
            setXY: {
                x: 874,
                y: 768,
                stepX: 10,
                stepY: -5,
            },
            setScale: {
                x: 0.55,
                y: 0.55,
            }
        });
        // this.cardBack1.children.forEach((card) => {
        //     card.enableFilters();
        //     // card.filters.external.add(new Filters.Shadow(this.cameras.main,0.5, 0.5, 0.05, 0.5, 0x000), 10);

        //     // card.filters.external.add(new Filters.Glow(this.cameras.main, 0,0.8,0,1.5,false,2,3), 1);
        // })

        // this.cardBack2 = this.add.image(724,384,'cardBack').setScale(0.3);

        const slots = [
            {
                x: 964,
                y: 268,
                from: 180,
                to: -15,
            },
            {
                x: 964,
                y: 1100,
                from: 180,
                to: -15,
            },
            {
                x: 1004,
                y: 268,
                from: 180,
                to: 0,
            },
            {
                x: 1004,
                y: 1100,
                from: 180,
                to: 0,
            },
            {
                x: 1044,
                y: 268,
                from: 180,
                to: 15,
            },
            {
                x: 1044,
                y: 1100,
                from: 180,
                to: 15,
            },
        ];

        this.time.delayedCall(1000, (...slots) => {
            this.tweens.add({
                targets: this.cardBack1.getChildren().reverse(),
                x: (target, key, value, index) => slots[index].x,
                y: (target, key, value, index) => slots[index].y,
                angle: {
                    from: (target, key, value, index) => slots[index].from,
                    to: (target, key, value, index) => slots[index].to,
                },
                ease: "Expo.inOut",
                scaleX: { from: 0.6, to: 0.5 },
                scaleY: { from: 0.6, to: 0.5 },
                duration: 600,
                delay: this.tweens.stagger(300),
                onCompleteHandler: (target, key, value, index) => {
                    index % 2 == 0 ? this.opponentCards.push(target) : this.selfCards.push(target);
                    this.children.bringToTop(target);
                },
                onComplete: (tween, target) => {
                    this.countDownMoney();
                    this.isCardsDistributed = true;
                    this.selfSee.setVisible(true);
                    this.selfFold.setVisible(true);
                    this.selfCall.setVisible(true);
                    this.selfRaise.setVisible(true);
                    // this.selfShow.setVisible(true);

                    this.selfMoneyText.setVisible(true);
                    this.opponentMoneyText.setVisible(true);
                    this.potText.setVisible(true);
                    this.stackText.setVisible(true);
                }
            })
        }, slots, this);

        this.potText = this.add.text(880, 640, `Pot : $${this.stack * 2}`, { fontFamily: "Serif", fontSize: "48px", color: "#fff", padding: { x: 20, y: 10 } });
        this.stackText = this.add.text(880, 700, `Stack : $${this.stack}`, { fontFamily: "Serif", fontSize: "42px", color: "#fff", padding: { x: 20, y: 10 } });
        this.potText.setVisible(false);
        this.stackText.setVisible(false);

        this.selfFold = this.add.text(300, 1050, 'Fold', { fontFamily: "Arial", fontSize: "36px", color: "#000", backgroundColor: "#fff", padding: { x: 20, y: 10 } });
        this.selfCall = this.add.text(300, 1150, "Call", { fontFamily: "Arial", fontSize: "36px", color: "#000", backgroundColor: "#fff", padding: { x: 20, y: 10 } });
        this.selfRaise = this.add.text(500, 1050, "Raise", { fontFamily: "Arial", fontSize: "36px", color: "#000", backgroundColor: "#fff", padding: { x: 20, y: 10 } });
        this.selfShow = this.add.text(300, 1250, "Show", { fontFamily: "Arial", fontSize: "36px", color: "#000", backgroundColor: "#fff", padding: { x: 20, y: 10 } });

        this.selfFold.setOrigin(0.5, 0.5);
        this.selfCall.setOrigin(0.5, 0.5);
        this.selfRaise.setOrigin(0.5, 0.5);
        this.selfShow.setOrigin(0.5, 0.5);

        this.selfFold.setInteractive();
        this.selfCall.setInteractive();
        this.selfRaise.setInteractive();
        this.selfShow.setInteractive();

        this.selfFold.setVisible(false);
        this.selfCall.setVisible(false);
        this.selfRaise.setVisible(false);
        this.selfShow.setVisible(false);

        this.selfFold.on('pointerdown', () => {
            if (this.turn == 0) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`You Folded...`);

                this.turn = -1;
                this.gameEndWithFold('self');
            }
        }, this);

        this.selfCall.on('pointerdown', () => {
            if (this.turn == 0 && this.selfMoney > this.stack * this.selfMultiplexer) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`You Called $${this.stack * this.selfMultiplexer}`);
                this.turn = 1;
                this.selfDecrease(this.stack * this.selfMultiplexer);

                this.time.delayedCall(1000, () => {
                    this.playOpponent();
                }, null, this);
            }
        }, this);

        this.selfRaise.on('pointerdown', () => {
            if (this.turn == 0 && this.selfMoney > this.stack * this.selfMultiplexer * 2) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`You Raised $${this.stack * 2 * this.selfMultiplexer}`);
                this.stack *= 2;
                this.stackText.setText(`Stack : $${this.stack}`);
                this.turn = 1;
                this.selfDecrease(this.stack * this.selfMultiplexer);
                this.time.delayedCall(1000, () => {
                    this.playOpponent();
                }, null, this);
            }
        }, this);

        this.selfShow.on('pointerdown', () => {
            if (this.turn == 0 && this.selfMoney > this.stack * this.selfMultiplexer * 2) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`You Showed $${this.stack * 2 * this.selfMultiplexer}`);
                this.stack *= 2;
                this.stackText.setText(`Stack : $${this.stack}`);
                this.turn = -1;
                this.selfDecrease(this.stack * this.selfMultiplexer);

                this.gameEndWithShow('self');
            }
        }, this);

        this.selfSee = this.add.text(500, 1150, " See ", { fontFamily: "Arial", fontSize: "36px", color: "#000", backgroundColor: "#fff", padding: { x: 20, y: 10 } });
        this.selfSee.setVisible(false);
        this.selfSee.setOrigin(0.5, 0.5);
        this.selfSee.setInteractive();

        this.selfSee.on('pointerdown', () => {
            this.selfSee.setScale(0.95);
            if (this.isCardsDistributed && !this.seen) {
                this.selfCardsNames.forEach((x) => {
                    this.load.image(x, `assets/cards/${x}`);
                });
                this.load.start();
                let i = 0;
                this.tweens.add({
                    targets: this.selfCards,
                    scaleX: 0,
                    ease: "Quint.inOut",
                    duration: 250,
                    yoyo: true,
                    delay: this.tweens.stagger(150),

                    onYoyo: (tween, target) => {
                        console.log(this.selfCardsNames[i]);
                        target.setTexture(this.selfCardsNames[i++]);
                    }
                });
                this.seen = true;
                this.selfSee.setVisible(false);
                this.selfShow.setX(500);
                this.selfShow.setY(1150);

                this.selfMultiplexer = 2;
            }

        });

        this.selfSee.on('pointerup', () => {
            this.selfSee.setScale(1);
        });
        this.selfSee.on('pointerout', () => {
            this.selfSee.setScale(1);
        });

        this.selfMoneyText = this.add.text(1300, 1000, `$ ${this.selfMoney}`, { fontFamily: "Arial", fontSize: "40px", color: "#ffff00", backgroundColor: "#000", borderRadius: "10px", padding: { x: 20, y: 10 } });
        this.selfMoneyText.setVisible(false);

        this.opponentMoneyText = this.add.text(1300, 300, `$ ${this.opponentMoney}`, { fontFamily: "Arial", fontSize: "40px", color: "#ffff00", backgroundColor: "#000", borderRadius: "10px", padding: { x: 20, y: 10 } });
        this.opponentMoneyText.setVisible(false);

        this.potText = this.add.text(880, 640, `Pot : $${this.stack * 2}`, { fontFamily: "Serif", fontSize: "48px", color: "#fff", padding: { x: 20, y: 10 } });
        this.stackText = this.add.text(880, 700, `Stack : $${this.stack}`, { fontFamily: "Serif", fontSize: "42px", color: "#fff", padding: { x: 20, y: 10 } });
        this.potText.setVisible(false);
        this.stackText.setVisible(false);

        this.playingMessage = this.add.text(420, 720, `Opponent Raised $${2000}`, { fontFamily: "Serif", fontSize: "36px", color: "#fff", backgroundColor: "#000", padding: { x: 20, y: 10 } });
        this.playingMessage.setOrigin(0.5, 0.5);
        this.playingMessage.setVisible(false);

        this.restart = this.add.text(1400, 720, `🔄 Restart`, { fontFamily: "Arial", fontSize: "36px", color: "#ff0000", backgroundColor: "#aaa", padding: { x: 30, y: 20 } });
        this.restart.setOrigin(0.5, 0.5);
        this.restart.setInteractive();

        this.replayAudio = this.add.text(1500, 620, `Like the Closing Statement.. \n     Click here to Replay it`, { fontFamily: "Arial", fontSize: "30px", color: "#ff0000", backgroundColor: "#aaa", padding: { x: 20, y: 10 } });
        this.replayAudio.setOrigin(0.5, 0.5);
        this.replayAudio.setInteractive();

        this.replayAudio.on("pointerdown", () => {
            if (this.audioChunks.length > 0) {
                this.playFullAccumulatedAudio();
            }
        })
        this.replayAudio.setVisible(false);

        this.restart.on('pointerdown', () => {
            if (this.canRestart) {

                this.cards = [
                    'ace_of_spades.png', '2_of_spades.png', '3_of_spades.png', '4_of_spades.png', '5_of_spades.png', '6_of_spades.png', '7_of_spades.png', '8_of_spades.png', '9_of_spades.png', '10_of_spades.png', 'jack_of_spades2.png', 'queen_of_spades2.png', 'king_of_spades2.png',
                    'ace_of_hearts.png', '2_of_hearts.png', '3_of_hearts.png', '4_of_hearts.png', '5_of_hearts.png', '6_of_hearts.png', '7_of_hearts.png', '8_of_hearts.png', '9_of_hearts.png', '10_of_hearts.png', 'jack_of_hearts2.png', 'queen_of_hearts2.png', 'king_of_hearts2.png',
                    'ace_of_diamonds.png', '2_of_diamonds.png', '3_of_diamonds.png', '4_of_diamonds.png', '5_of_diamonds.png', '6_of_diamonds.png', '7_of_diamonds.png', '8_of_diamonds.png', '9_of_diamonds.png', '10_of_diamonds.png', 'jack_of_diamonds2.png', 'queen_of_diamonds2.png', 'king_of_diamonds2.png',
                    'ace_of_clubs.png', '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', '5_of_clubs.png', '6_of_clubs.png', '7_of_clubs.png', '8_of_clubs.png', '9_of_clubs.png', '10_of_clubs.png', 'jack_of_clubs2.png', 'queen_of_clubs2.png', 'king_of_clubs2.png',
                ]
                this.cards = math.RND.shuffle(this.cards);

                this.selfCardsNames = (() => {
                    let temp = [];
                    for (let i = 0; i < 3; i++) {
                        let card = math.RND.pick(this.cards);
                        temp.push(card);
                        this.cards = math.RND.shuffle(this.cards);
                        let index = this.cards.indexOf(card);
                        this.cards = this.cards.slice(0, index).concat(this.cards.slice(index + 1));
                    }
                    // console.log("My Cards : ",temp.join(' ,'));
                    return [...temp];
                })();

                this.opponentCardsNames = (() => {
                    let temp = [];
                    for (let i = 0; i < 3; i++) {
                        let card = math.RND.pick(this.cards);
                        temp.push(card);
                        this.cards = math.RND.shuffle(this.cards);
                        let index = this.cards.indexOf(card);
                        this.cards = this.cards.slice(0, index).concat(this.cards.slice(index + 1));
                    }
                    // console.log("Opponent Cards : ",temp.join(' ,'));
                    return [...temp];
                })();

                this.isCardsDistributed = false;
                this.cardBack1 = null;

                this.selfCards = [];
                this.opponentCards = [];

                this.seen = false;

                this.selfSee = null;

                this.selfMoneyText = null;
                this.opponentMoneyText = null;
                this.playingMessage = null;

                this.stack = 50;
                this.pot = 0;

                this.selfMultiplexer = 1;

                this.selfCall = null;
                this.selfFold = null;
                this.selfRaise = null;
                this.selfShow = null;

                this.turn = 0; // 0 -> self and 1 -> opponent and -1 -> Game Has Been Ended...
                this.canRestart = false;
                this.restart = null;

                this.audioContext = null;
                this.audioChunks = [];
                this.bufferSource = null;

                this.replayAudio = null;
                this.winData = null;

                this.session?.close();
                this.scene.restart();
            }
        }, this);

        this.restart.setVisible(false);
    }

    countDownMoney() {
        let temp = 1;
        let id = setInterval(() => {
            this.selfMoneyText.setText(`$ ${--this.selfMoney}`);
            this.opponentMoneyText.setText(`$ ${--this.opponentMoney}`);
            this.pot += 2;
            this.potText.setText(`Pot : $${this.pot}`);
            if (temp >= 50) {
                clearInterval(id);
            }
            temp++;
        }, 15);
    }

    selfDecrease(dec) {
        let stop = this.selfMoney - dec;
        let stepDec = dec / 50;
        stepDec = parseFloat(stepDec.toFixed(2));

        let id = setInterval(() => {
            this.selfMoney - stepDec < stop ? this.selfMoney = stop : this.selfMoney -= stepDec;
            this.selfMoneyText.setText(`$ ${this.selfMoney}`);
            if (this.selfMoney == stop) {
                clearInterval(id);
            }
        }, 10);
        this.increasePot(dec);
    }

    opponentDecrease(dec) {
        let stop = this.opponentMoney - dec;
        let stepDec = dec / 50;
        stepDec = parseFloat(stepDec.toFixed(2));

        let id = setInterval(() => {
            this.opponentMoney - stepDec < stop ? this.opponentMoney = stop : this.opponentMoney -= stepDec;
            this.opponentMoneyText.setText(`$ ${this.opponentMoney}`);
            if (this.opponentMoney == stop) {
                clearInterval(id);
            }
        }, 10);
        this.increasePot(dec);
    }

    increasePot(inc) {
        let stop = this.pot + inc;
        let temp = this.pot;
        this.pot += inc;
        let stepInc = inc / 50;
        stepInc = parseFloat(stepInc.toFixed(2));

        let id = setInterval(() => {
            temp + stepInc > stop ? temp = stop : temp += stepInc;
            this.potText.setText(`Pot : $${temp}`);
            if (temp == stop) {
                this.potText.setText(`Pot : $${this.pot}`);
                clearInterval(id);
            }
        }, 10);
    }

    playOpponent() {
        if (this.turn == 1) {

            let num = parseInt(Math.random() * Math.random() * Math.random() * 1000);
            if (num == 1) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`Opponent Folded...`);

                this.turn = -1;
                this.gameEndWithFold('opponent');
                return;
            }
            if ((num % 13 == 0 && num > 500) && this.opponentMoney > this.stack * 2) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`Opponent Showed $${this.stack * 2}`);
                this.stack *= 2;
                this.stackText.setText(`Stack : $${this.stack}`);
                this.opponentDecrease(this.stack);

                this.turn = -1;
                this.gameEndWithShow('opponent');
                return;
            }
            if ((num % 5 == 0) && this.opponentMoney > this.stack * 2) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`Opponent Raised $${this.stack * 2}`);
                this.stack *= 2;
                this.stackText.setText(`Stack : $${this.stack}`);
                this.opponentDecrease(this.stack);
                this.turn = 0;
                return
            }
            if ((num >= 2) && this.opponentMoney > this.stack) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`Opponent Called $${this.stack}`);
                this.opponentDecrease(this.stack);
                this.turn = 0;
                return;
            }
            this.playingMessage.setVisible(true);
            this.playingMessage.setText(`Opponent Folded...`);

            this.turn = -1;
            this.gameEndWithFold('opponent');
        }
    }

    gameEndWithFold(from) {
        if (from == "opponent") {
            this.time.delayedCall(1000, () => {
                this.playingMessage.setText(`You won $${this.pot} amount.`);
                this.selfMoney += this.pot;
                this.selfMoneyText.setText(`$ ${this.selfMoney}`);
                this.potText.setText(`Pot : $0`);
                this.pot = 0;
                this.stack = 50;
                this.canRestart = true;
                this.restart.setVisible(true);
            }, null, this);
        } else {
            this.time.delayedCall(1000, () => {
                this.playingMessage.setText(`Opponent won $${this.pot} amount.`);
                this.opponentMoney += this.pot;
                this.opponentMoneyText.setText(`$ ${this.opponentMoney}`);
                this.potText.setText("Pot : $0");
                this.pot = 0;
                this.stack = 50;
                this.canRestart = true;
                this.restart.setVisible(true);
            }, null, this);
        }
    }

    gameEndWithShow(from) {
        this.opponentCardsNames.forEach((x) => {
            this.load.image(x, `assets/cards/${x}`);
        });
        if (!this.seen) {
            this.selfCardsNames.forEach((x) => {
                this.load.image(x, `assets/cards/${x}`);
            });
        }
        this.load.start();

        let i = 0;
        // this.opponentCards.forEach((x) => {
        //     console.log(x,this.opponentCardsNames[i]);

        //     x.setTexture(this.opponentCardsNames[i++]);
        // });
        this.tweens.add({
            targets: this.opponentCards,
            scaleX: 0,
            ease: "Quint.inOut",
            duration: 200,
            yoyo: true,
            delay: this.tweens.stagger(200),
            onYoyo: (tween, target) => {
                target.setTexture(this.opponentCardsNames[i++]);
            }
        });
        if (!this.seen) {
            let i = 0;
            this.tweens.add({
                targets: this.selfCards,
                scaleX: 0,
                ease: "Quint.inOut",
                duration: 200,
                yoyo: true,
                delay: this.tweens.stagger(200),

                onYoyo: (tween, target) => {
                    target.setTexture(this.selfCardsNames[i++]);
                }
            });
        }
        if (this.winData.win == "self") {
            this.playingMessage.setText(`You won $${this.pot} amount.\n By ${this.winData.by}`);
            this.selfMoney += this.pot;
            this.selfMoneyText.setText(`$ ${this.selfMoney}`);
            this.potText.setText(`Pot : $0`);
            this.pot = 0;
            this.stack = 50;
            this.canRestart = true;
            this.restart.setVisible(true);
            this.playFullAccumulatedAudio();
            this.replayAudio.setVisible(true);
        } else {
            this.playingMessage.setText(`Opponent won $${this.pot} amount.\n By ${this.winData.by}`);
            this.opponentMoney += this.pot;
            this.opponentMoneyText.setText(`$ ${this.opponentMoney}`);
            this.potText.setText("Pot : $0");
            this.pot = 0;
            this.stack = 50;
            this.canRestart = true;
            this.restart.setVisible(true);
            this.playFullAccumulatedAudio();
            this.replayAudio.setVisible(true);
        }
    }

    earlyCall() {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GeminiApiKey });

        const model = 'gemini-3.1-flash-live-preview';
        // const model = 'gemini-3-flash-live';
        const config = { responseModalities: [Modality.AUDIO] };

        const main2 = async (prompt) => {

            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                    sampleRate: 24000
                });
            }
            console.log(this.audioContext.state);
            // if (this.audioContext.state === 'suspended') {
            //     await this.audioContext.resume();
            // }

            let i = 1;

            this.session = await ai.live.connect({
                model: model,
                callbacks: {
                    onopen: function () {
                        console.debug('Opened');
                    },
                    onmessage: (message) => {
                        const content = message.serverContent;

                        // 1. Process and cache audio data parts as they stream in
                        if (content?.modelTurn?.parts) {
                            for (const part of content.modelTurn.parts) {
                                if (part.inlineData && part.inlineData.data) {
                                    console.debug("Loading...");
                                    this.processAndCacheChunk(part.inlineData.data);
                                }
                            }
                        }

                        if (content?.turnComplete) {
                            this.selfShow.setVisible(true);
                            this.session?.close();
                        }
                    },
                    onerror: function (e) {
                        console.debug('Error:', e.message);
                    },
                    onclose: function (e) {
                        console.debug('Close:', e.reason);
                    },
                },
                config: config,
            });

            console.debug("Session started");

            this.session.sendRealtimeInput({
                text: prompt,
            });
        }

        const main = async () => {
            const response = await ai.models.generateContent({
                model: "gemini-3.1-flash-lite",
                contents: `Just Answer in StringifiedJson Format like: {win:"self",by:"Trio"} or {win:"opponent",by:"High Card"}, here self cards : ${this.selfCardsNames.join(",")} and opponent cards : ${this.opponentCardsNames.join(",")} , game: Teen Patti, follow all rules to compare as this is show case between self and opponent, answer in given format only...`,
            });
            // console.log(response.text);
            this.winData = JSON.parse(response.text);

            if (this.winData.win == "self") {
                await main2(`The Self(YOU) Player has won the game by ${this.winData.by}, here self cards : ${this.selfCardsNames.join(",")} and opponent cards : ${this.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautiful comforting and informative ending + closing statement line, speak extreme funnier with clear and short and with appropriate winning conditions and appropriate referencing as "You" to self and "Opponent" to opponent, do not change the decision case as it has been completed...`);
                // await main2(`The Self(YOU) Player has won the game by ${data.by}, here self cards : ${this.selfCardsNames.join(",")} and opponent cards : ${this.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautifull comforting and informative ending + closing statement line, speak with full stamina and with max energy with appropriate winning conditions, indian tone and speak as how ravi-shastri speaks in criket commentry, do not change the decision case as it has been completed...`);
            } else {
                await main2(`The Opponent(OTHER) Player has won the game by ${this.winData.by}, here self cards : ${this.selfCardsNames.join(",")} and opponent cards : ${this.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautiful comforting and informative ending + closing statement line, speak extreme funnier with clear and short and with appropriate winning conditions and appropriate referencing as "You" to self or "Opponent" to opponent, do not change the decision case as it has been completed...`);
                // await main2(`The Opponent(OTHER) Player has won the game by ${data.by}, here self cards : ${this.selfCardsNames.join(",")} and opponent cards : ${this.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautifull comforting and informative ending + closing statement line, speak with full stamina and with max energy with appropriate winning conditions, indian tone and speak as how the ravi-shastri speaks in cricket commentry, do not change the decision case as it has been completed...`);
            }
        }

        main();
    }

    processAndCacheChunk(base64String) {
        const binaryString = window.atob(base64String);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const numSamples = bytes.length / 2;
        const dataView = new DataView(bytes.buffer);
        const float32Array = new Float32Array(numSamples);

        for (let i = 0; i < numSamples; i++) {
            const int16Sample = dataView.getInt16(i * 2, true);
            float32Array[i] = int16Sample / 32768.0;
        }

        // Push this single processed chunk array into our storage array
        this.audioChunks.push(float32Array);
    }

    playFullAccumulatedAudio() {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (!this.audioChunks || this.audioChunks.length === 0) {
            console.warn("⚠️ No audio chunks accumulated to play.");
            return;
        }

        // 1. Force totalSamples to be a strict integer
        let totalSamples = 0;
        for (const chunk of this.audioChunks) {
            if (chunk && chunk.length) {
                totalSamples += chunk.length;
            }
        }
        totalSamples = Math.floor(totalSamples);

        // 2. Extra guard: Validate against 0, NaN, or Infinity
        if (totalSamples <= 0 || !Number.isInteger(totalSamples)) {
            console.warn("⚠️ Invalid total samples calculation:", totalSamples);
            this.audioChunks = [];
            return;
        }

        try {
            const combinedFloatArray = new Float32Array(totalSamples);

            let offset = 0;
            for (const chunk of this.audioChunks) {
                // Ensure we don't copy past the allocated boundary
                if (offset + chunk.length <= totalSamples) {
                    combinedFloatArray.set(chunk, offset);
                    offset += chunk.length;
                }
            }

            // Clear the cache immediately for the next turn
            // this.audioChunks = [];

            // 3. Make absolutely sure SAMPLE_RATE is a valid integer too
            const sampleRate = Math.floor(this.SAMPLE_RATE) || 24000;

            // 4. Create the buffer safely
            const audioBuffer = this.audioContext.createBuffer(1, totalSamples, sampleRate);
            audioBuffer.getChannelData(0).set(combinedFloatArray);

            this.bufferSource = this.audioContext.createBufferSource();
            this.bufferSource.buffer = audioBuffer;
            this.bufferSource.connect(this.audioContext.destination);

            this.bufferSource.start(0);
            console.log(`🔊 Playing unified voice response (${totalSamples} samples)`);

        } catch (error) {
            console.error("❌ Error constructing or playing full audio buffer:", error);
            this.audioChunks = []; // Clean up on failure
        }
    }
}