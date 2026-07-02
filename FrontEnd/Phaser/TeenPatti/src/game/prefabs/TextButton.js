import { GameObjects } from "phaser";

export default class TextButton extends GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);

        this.setOrigin(0.5, 0.5);
        this.setInteractive();
        this.setVisible(false);
    }
}