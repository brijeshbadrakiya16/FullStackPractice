import { Scene } from 'phaser';
import gameWin from "../../../assets/images/gameWin.png";
import gameOver from "../../../assets/images/gameOver.png";

export class GameFinish extends Scene {
    constructor() {
        super('gameFinish');
        this.background = null;
        this.win = null;
        this.winMoney = null;
        this.headText = null;
        this.moneyText = null;
        this.menuButton = null;
    }
    init(data) {
        this.win = data.win || "opponent";
        this.winMoney = data.winMoney || 100;
    }

    preload() {
        this.load.image('gameWin', gameWin);
        this.load.image('gameOver', gameOver);
    }

    create() {
        if (this.win === "self") {
            this.background = this.add.image(1024, 768, 'gameWin');
            this.headText = this.add.text(1024, 150, "YOU WON", { align: "center", fontFamily: "Sans", fontStyle:"bold" , fontSize: "140px" });
            this.moneyText = this.add.text(1024,500,`$ ${this.winMoney}`,{align: "center", color:"#ffffff", fontFamily: "Arial", fontStyle:"bolder" , fontSize: "180px",stroke:"#ffe000",strokeThickness:10})
            this.moneyText.setOrigin(0.5,0.5);
            this.menuButton = this.add.text(1024,1114,"Menu",{ align: "center", fontFamily: "Georgia", fontStyle:"bold" , fontSize: "70px",fixedWidth:430, padding: {y:20}});
            this.menuButton.setOrigin(0.5,0.5);
            this.menuButton.setInteractive();
            this.menuButton.on("pointerover",()=>{
                this.menuButton.setScale(1.05);
            },this);
            this.menuButton.on("pointerdown",()=>{
                this.scene.stop('gameFinish');
                this.scene.start('startScene');
            },this);
            this.menuButton.on("pointerout",()=>{
                this.menuButton.setScale(1);
            },this);
        } else if (this.win === "opponent") {
            this.background = this.add.image(1024, 768, 'gameOver');
            this.headText = this.add.text(1024, 300, "YOU LOSE", { align: "center", fontFamily: "Sans", fontSize: "120px" });
            this.restartButton = this.add.rectangle(852,1218,222,222);
            this.restartButton.setOrigin(0.5,0.5);
            this.restartButton.setStrokeStyle(0,0xff0000).setToTop();
            this.restartButton.setInteractive();
            this.restartButton.on("pointerdown",()=>{
                this.scene.stop('gameFinish');
                this.scene.start('game');
            },this);
            this.menuButton = this.add.rectangle(1210,1218,222,222);
            this.menuButton.setOrigin(0.5,0.5);
            this.menuButton.setStrokeStyle(0,0xff0000).setToTop();
            this.menuButton.setInteractive();
            this.menuButton.on('pointerdown',()=>{
                this.scene.stop('gameFinish');
                this.scene.start('startScene');
            },this);
        }
        this.headText.setOrigin(0.5, 0.5);

        this.background.setScale(1.72);
    }
}
