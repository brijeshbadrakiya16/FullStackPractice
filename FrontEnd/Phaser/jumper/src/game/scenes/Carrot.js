import { GameObjects, Physics } from "phaser";

export default class Carrot extends Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        this.setScale(0.5);
    }
}