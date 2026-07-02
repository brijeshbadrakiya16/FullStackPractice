import { GameObjects, Scene } from "phaser";
import backgroundImage from "../../../assets/images/background.png";
import cardBack from "../../../assets/images/card_back4.png";

export default class StartScene extends Scene {
    constructor() {
        super('startScene');
    }
    preload() {
        this.load.image('cardBack', cardBack);
        this.load.image('home', backgroundImage)

        // this.time.delayedCall(5000,()=>this.scene.start('game'),null,this);
    }
    create() {
        this.add.image(1024, 766, 'home').setScale(1.72); //2048 1536

        // const element = document.createElement('button');

        // element.innerText = "START GAME >"

        // element.style.backgroundColor = "#ff1100";
        // element.style.textAlign = "center";
        // element.style.padding = "25px";
        // element.style.border = "1px solid white";
        // element.style.fontSize = "45px";
        // element.style.color = "white";
        // element.style.cursor = "pointer";
        // element.style.borderRadius = "50px";
        // element.style.fontFamily = "Serif";

        // this.startGameButton = this.add.dom(1024,1000,element);
        this.startGameButton = this.add.text(1024, 1000, "Start Game >", { align: "center", fontSize: "45px", padding: { x: 25, y: 25 }, backgroundColor: "#ffffff", fontFamily: "Serif" });
        this.startGameButton.setOrigin(0.5);
        this.startGameButton.setStroke("#ff1100",7);

        this.startGameButton.setInteractive();

        this.startGameButton.on("pointerdown", () => {
            this.startGameButton.setScale(0.9);
            this.scene.start('game');
            // this.scene.start('gameFinish',{win : "opponent"});
        }, this);

        this.startGameButton.on('pointerover', () => {
            this.startGameButton.setScale(1.1);
        }, this);
        this.startGameButton.on('pointerout', () => {
            this.startGameButton.setScale(1);
        }, this);
    }
}