import { slots } from "./constants";

export const distributeCards = (scene) => {
    scene.time.delayedCall(1000, (...slots) => {
        scene.tweens.add({
            targets: scene.cardBack1.getChildren().reverse(),
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
            delay: scene.tweens.stagger(300),
            onCompleteHandler: (target, key, value, index) => {
                index % 2 == 0 ? scene.opponentCards.push(target) : scene.selfCards.push(target);
                scene.children.bringToTop(target);
            },
            onComplete: (tween, target) => {
                countDownMoney(scene);
                scene.isCardsDistributed = true;
                scene.selfSee.setVisible(true);
                scene.selfFold.setVisible(true);
                scene.selfCall.setVisible(true);
                scene.selfRaise.setVisible(true);
                // scene.selfShow.setVisible(true);

                scene.selfMoneyText.setVisible(true);
                scene.opponentMoneyText.setVisible(true);
                scene.potText.setVisible(true);
                scene.stackText.setVisible(true);
            }
        })
    }, slots, scene);
};

export const countDownMoney = (scene) => {
    let temp = 1;
    let id = setInterval(() => {
        scene.selfMoneyText.setText(`$ ${--scene.selfMoney}`);
        scene.opponentMoneyText.setText(`$ ${--scene.opponentMoney}`);
        scene.pot += 2;
        scene.potText.setText(`Pot : $${scene.pot}`);
        if (temp >= 50) {
            clearInterval(id);
        }
        temp++;
    }, 15);
};

export const selfDecrease = (scene, dec) => {
    let stop = scene.selfMoney - dec;
    let stepDec = dec / 50;
    stepDec = parseFloat(stepDec.toFixed(2));

    let id = setInterval(() => {
        scene.selfMoney - stepDec < stop ? scene.selfMoney = stop : scene.selfMoney -= stepDec;
        scene.selfMoneyText.setText(`$ ${scene.selfMoney}`);
        if (scene.selfMoney == stop) {
            clearInterval(id);
        }
    }, 10);
    increasePot(scene, dec);
};

export const opponentDecrease = (scene, dec) => {
    let stop = scene.opponentMoney - dec;
    let stepDec = dec / 50;
    stepDec = parseFloat(stepDec.toFixed(2));

    let id = setInterval(() => {
        scene.opponentMoney - stepDec < stop ? scene.opponentMoney = stop : scene.opponentMoney -= stepDec;
        scene.opponentMoneyText.setText(`$ ${scene.opponentMoney}`);
        if (scene.opponentMoney == stop) {
            clearInterval(id);
        }
    }, 10);
    increasePot(scene, dec);
};

export const increasePot = (scene, inc) => {
    let stop = scene.pot + inc;
    let temp = scene.pot;
    scene.pot += inc;
    let stepInc = inc / 50;
    stepInc = parseFloat(stepInc.toFixed(2));

    let id = setInterval(() => {
        temp + stepInc > stop ? temp = stop : temp += stepInc;
        scene.potText.setText(`Pot : $${temp}`);
        if (temp == stop) {
            scene.potText.setText(`Pot : $${scene.pot}`);
            clearInterval(id);
        }
    }, 10);
};