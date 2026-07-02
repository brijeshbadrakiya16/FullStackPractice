// w- 1024 h- 768
// yudiz-yash

import { Filters, GameObjects, Math as math, Scene } from 'phaser';
import CardBack from "../prefabs/CardBack";
import { distributeCards, selfDecrease } from "../scripts/animations";
import { getOpponentCards, getSelfCards } from "../scripts/helper";
import { moneyTextStyle, playingTextStyle, potTextStyle, replayTextStyle, restartTextStyle, selfButtonTextStyle, stackTextStyle } from "../../../assets/styles/textStyles";
import TextButton from "../prefabs/TextButton";
import { gameEndWithFold, gameEndWithShow, playOpponent } from "../scripts/gameManager";
import { playFullAccumulatedAudio } from "../scripts/endingAudio";
import { earlyCall } from "../scripts/gemini";

export class Game extends Scene {
    constructor() {
        super('game');

        this.selfCardsNames = getSelfCards();

        this.opponentCardsNames = getOpponentCards();

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

    init() {
        this.selfCardsNames = getSelfCards();

        this.opponentCardsNames = getOpponentCards();

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
    }

    create() {
        earlyCall(this);

        this.cardBack1 = this.add.group({
            classType: CardBack,
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

        distributeCards(this);

        this.potText = this.add.text(880, 640, `Pot : $${this.stack * 2}`, potTextStyle);
        this.stackText = this.add.text(880, 700, `Stack : $${this.stack}`, stackTextStyle);
        this.potText.setVisible(false);
        this.stackText.setVisible(false);

        this.selfFold = new TextButton(this, 300, 1050, 'Fold', selfButtonTextStyle);
        this.selfCall = new TextButton(this, 300, 1150, "Call", selfButtonTextStyle);
        this.selfRaise = new TextButton(this, 500, 1050, "Raise", selfButtonTextStyle);
        this.selfShow = new TextButton(this, 300, 1250, "Show", selfButtonTextStyle);
        this.add.existing(this.selfFold);
        this.add.existing(this.selfCall);
        this.add.existing(this.selfRaise);
        this.add.existing(this.selfShow);

        this.selfFold.on('pointerdown', () => {
            if (this.turn == 0) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`You Folded...`);

                this.turn = -1;
                gameEndWithFold(this, 'self');
            }
        }, this);

        this.selfCall.on('pointerdown', () => {
            if (this.turn == 0 && this.selfMoney > this.stack * this.selfMultiplexer) {
                this.playingMessage.setVisible(true);
                this.playingMessage.setText(`You Called $${this.stack * this.selfMultiplexer}`);
                this.turn = 1;
                selfDecrease(this, this.stack * this.selfMultiplexer);

                this.time.delayedCall(1000, () => {
                    playOpponent(this);
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
                selfDecrease(this, this.stack * this.selfMultiplexer);
                this.time.delayedCall(1000, () => {
                    playOpponent(this);
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
                selfDecrease(this, this.stack * this.selfMultiplexer);
                gameEndWithShow(this, 'self');
            }
        }, this);

        this.selfSee = new TextButton(this, 500, 1150, " See ", selfButtonTextStyle);
        this.add.existing(this.selfSee);

        this.selfSee.on('pointerdown', () => {
            this.selfSee.setScale(0.95);
            if (this.isCardsDistributed && !this.seen) {
                this.selfCardsNames.forEach((x) => {
                    const assetUrl = new URL(`../../../assets/images/cards/${x}`, import.meta.url).href;
                    this.load.image(x, assetUrl);
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

        this.selfMoneyText = this.add.text(1300, 1000, `$ ${this.selfMoney}`, moneyTextStyle);
        this.selfMoneyText.setVisible(false);

        this.opponentMoneyText = this.add.text(1300, 300, `$ ${this.opponentMoney}`, moneyTextStyle);
        this.opponentMoneyText.setVisible(false);

        this.playingMessage = this.add.text(420, 720, `Opponent Raised $${2000}`, playingTextStyle);
        this.playingMessage.setOrigin(0.5, 0.5);
        this.playingMessage.setVisible(false);

        this.restart = new TextButton(this, 1400, 720, `🔄 Restart`, restartTextStyle);
        this.replayAudio = new TextButton(this, 1500, 620, `Like the Closing Statement.. \n     Click here to Replay it`, replayTextStyle);
        this.add.existing(this.restart);
        this.add.existing(this.replayAudio);

        this.replayAudio.on("pointerdown", () => {
            if (this.audioChunks.length > 0) {
                playFullAccumulatedAudio();
            }
        })

        this.restart.on('pointerdown', () => {
            if (this.canRestart) {

                this.selfCardsNames = getSelfCards();

                this.opponentCardsNames = getOpponentCards();

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
    }
}