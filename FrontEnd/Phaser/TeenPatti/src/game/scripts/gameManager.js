import { opponentDecrease } from "./animations";
import { playFullAccumulatedAudio } from "./endingAudio";

export const playOpponent = (scene) => {
    if (scene.turn == 1) {

        let num = parseInt(Math.random() * Math.random() * Math.random() * 1000);
        if (num == 1) {
            scene.playingMessage.setVisible(true);
            scene.playingMessage.setText(`Opponent Folded...`);

            scene.turn = -1;
            gameEndWithFold(scene, 'opponent');
            return;
        }
        if ((num % 13 == 0 && num > 500) && scene.opponentMoney > scene.stack * 2) {
            scene.playingMessage.setVisible(true);
            scene.playingMessage.setText(`Opponent Showed $${scene.stack * 2}`);
            scene.stack *= 2;
            scene.stackText.setText(`Stack : $${scene.stack}`);
            opponentDecrease(scene, scene.stack);

            scene.turn = -1;
            gameEndWithShow(scene, 'opponent');
            return;
        }
        if ((num % 5 == 0) && scene.opponentMoney > scene.stack * 2) {
            scene.playingMessage.setVisible(true);
            scene.playingMessage.setText(`Opponent Raised $${scene.stack * 2}`);
            scene.stack *= 2;
            scene.stackText.setText(`Stack : $${scene.stack}`);
            opponentDecrease(scene, scene.stack);
            scene.turn = 0;
            return
        }
        if ((num >= 2) && scene.opponentMoney > scene.stack) {
            scene.playingMessage.setVisible(true);
            scene.playingMessage.setText(`Opponent Called $${scene.stack}`);
            opponentDecrease(scene, scene.stack);
            scene.turn = 0;
            return;
        }
        scene.playingMessage.setVisible(true);
        scene.playingMessage.setText(`Opponent Folded...`);

        scene.turn = -1;
        gameEndWithFold(scene, 'opponent');
    }
};

export const gameEndWithFold = (scene, from) => {
    if (from == "opponent") {
        scene.time.delayedCall(1000, () => {
            scene.playingMessage.setText(`You won $${scene.pot} amount.`);
            const winMoney = scene.pot;
            scene.selfMoney += scene.pot;
            scene.selfMoneyText.setText(`$ ${scene.selfMoney}`);
            scene.potText.setText(`Pot : $0`);
            scene.pot = 0;
            scene.stack = 50;
            scene.canRestart = true;
            // scene.restart.setVisible(true);
            scene.time.delayedCall(4500, () => {
                scene.scene.stop('game');
                scene.scene.start('gameFinish', { win: "self", money: winMoney });
            }, null, scene);
        }, null, scene);
    } else {
        scene.time.delayedCall(1000, () => {
            scene.playingMessage.setText(`Opponent won $${scene.pot} amount.`);
            const winMoney = scene.pot;
            scene.opponentMoney += scene.pot;
            scene.opponentMoneyText.setText(`$ ${scene.opponentMoney}`);
            scene.potText.setText("Pot : $0");
            scene.pot = 0;
            scene.stack = 50;
            scene.canRestart = true;
            scene.time.delayedCall(4500, () => {
                scene.scene.stop("game");
                scene.scene.start('gameFinish', { win: "opponent", money: winMoney });
            }, null, scene);
        }, null, scene);
    }
};

export const gameEndWithShow = (scene, from) => {
    scene.opponentCardsNames.forEach((x) => {
        const assetUrl = new URL(`../../../assets/images/cards/${x}`, import.meta.url).href;
        scene.load.image(x, assetUrl);
    });
    if (!scene.seen) {
        scene.selfCardsNames.forEach((x) => {
            const assetUrl = new URL(`../../../assets/images/cards/${x}`, import.meta.url).href;
            scene.load.image(x, assetUrl);
        });
    }
    scene.load.start();

    let i = 0;
    scene.tweens.add({
        targets: scene.opponentCards,
        scaleX: 0,
        ease: "Quint.inOut",
        duration: 200,
        yoyo: true,
        delay: scene.tweens.stagger(200),
        onYoyo: (tween, target) => {
            target.setTexture(scene.opponentCardsNames[i++]);
        }
    });
    if (!scene.seen) {
        let i = 0;
        scene.tweens.add({
            targets: scene.selfCards,
            scaleX: 0,
            ease: "Quint.inOut",
            duration: 200,
            yoyo: true,
            delay: scene.tweens.stagger(200),

            onYoyo: (tween, target) => {
                target.setTexture(scene.selfCardsNames[i++]);
            }
        });
    }
    if (scene.winData.win == "self") {
        const winMoney = scene.pot;
        scene.playingMessage.setText(`You won $${scene.pot} amount.\n By ${scene.winData.by}`);
        scene.selfMoney += scene.pot;
        scene.selfMoneyText.setText(`$ ${scene.selfMoney}`);
        scene.potText.setText(`Pot : $0`);
        scene.pot = 0;
        scene.stack = 50;
        scene.canRestart = true;
        scene.restart.setVisible(true);
        scene.replayAudio.setVisible(true);

        scene.time.delayedCall(500, () => playFullAccumulatedAudio(scene), null, scene);
        scene.time.delayedCall(4500, () => {
            scene.scene.stop('game');
            scene.scene.start('gameFinish', { win: scene.winData.win, money: winMoney });
        }, null, scene);
    } else {
        scene.playingMessage.setText(`Opponent won $${scene.pot} amount.\n By ${scene.winData.by}`);
        scene.opponentMoney += scene.pot;
        scene.opponentMoneyText.setText(`$ ${scene.opponentMoney}`);
        scene.potText.setText("Pot : $0");
        scene.pot = 0;
        scene.stack = 50;
        scene.canRestart = true;
        scene.restart.setVisible(true);
        scene.replayAudio.setVisible(true);
        scene.time.delayedCall(500, () => playFullAccumulatedAudio(scene), null, scene);
        scene.time.delayedCall(4500, () => {
            scene.scene.stop('game');
            scene.scene.start('gameFinish', { win: scene.winData.win, money: winMoney });
        }, null, scene);
    }
}