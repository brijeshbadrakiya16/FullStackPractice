import { GameObjects, Scene } from "phaser";

export class DiceButton extends GameObjects.Container {
    constructor(scene, x, y,textX,textY,playerNumber,bgColor) {
        super(scene, x, y);

        let box = scene.add.graphics();
        box.fillStyle(0xffffff,1);
        box.fillRoundedRect(0,0,180,100,12);
        this.add(box);

        let text = scene.add.text(textX,textY,`P\n${playerNumber}`,{
            fontFamily:"Vardana",
            color:"black",
            fontStyle:"bolder",
            backgroundColor:bgColor,
            fontSize:"29px",
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5,0.5);
        this.add(text);

        const dice = scene.add.sprite(128,50,'1').setOrigin(0.5,0.5).setInteractive();
        dice.on('pointerover',()=>{
            dice.setScale(0.9);
        });
        dice.on('pointerout',()=>{
            dice.setScale(1);
        });
        dice.on('pointerdown',()=>{
            dice.setScale(0.85);
        });
        dice.on('pointerup',()=>{
            dice.setScale(0.9);
        });
        this.add(dice);

        scene.add.existing(this);
    }
}