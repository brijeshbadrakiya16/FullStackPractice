import { GameObjects, Math as math, Scene } from "phaser";

export class DiceButton extends GameObjects.Container {
    constructor(scene, x, y, textX, textY, playerNumber, bgColor) {
        super(scene, x, y);
        this.playerNumber = playerNumber;

        let box = scene.add.graphics();
        box.fillStyle(0xffffff, 1);
        box.fillRoundedRect(0, 0, 180, 100, 12);
        this.add(box);

        let text = scene.add.text(textX, textY, `P\n${playerNumber}`, {
            fontFamily: "Vardana",
            color: "black",
            fontStyle: "bolder",
            backgroundColor: bgColor,
            fontSize: "29px",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5, 0.5);
        this.add(text);

        const dice = scene.add.sprite(128, 50, '1').setOrigin(0.5, 0.5).setInteractive();
        dice.on('pointerover', () => {
            dice.setScale(0.9);
        });
        dice.on('pointerout', () => {
            dice.setScale(1);
        });
        let diceTexture = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5', 'dice6'];
        const diceNumbers = [6, 3, 2, 1, 4, 5];
        this.rolling = false;
        this.wait = false;
        this.prevTurn = 0;
        this.turnCount = 0;

        const rollDice = (i, count, number) => {
            if (i == 0) {
                diceTexture = math.RND.shuffle(diceTexture);
            }
            if (i == 6) {
                i = -1;
                count++;
            } else {
                dice.setTexture(diceTexture[i]);
            }
            if (count < 3) {
                scene.time.delayedCall(40, (...args) => {
                    rollDice(args[0], args[1], args[2]);
                }, [++i, count, number], scene);
                dice.setScale(1);
            } else {
                dice.setTexture(`${number}`);
                // this.rolling = false;
                scene.diceRolled(number, this);
            }
        }

        dice.on('pointerdown', () => {
            if (!this.wait && scene.turn == this.playerNumber - 1) {
                // !this.rolling
                if (this.prevTurn !== scene.turn) {
                    this.prevTurn = scene.turn
                    this.turnCount = 0;
                } else {
                    this.turnCount++;
                }
                this.wait = true;
                dice.setScale(0.85);
                if (this.turnCount == 2) {
                    rollDice(0, 0, math.RND.shuffle([5, 2, 1, 3, 4])[math.RND.between(0, 4)]);
                } else {
                    rollDice(0, 0, math.RND.shuffle(diceNumbers)[math.RND.between(0, 5)]);

                }
                // this.rolling = true;
            }
        });
        dice.on('pointerup', () => {
            dice.setScale(0.9);
        });
        this.add(dice);

        scene.add.existing(this);
    }
}