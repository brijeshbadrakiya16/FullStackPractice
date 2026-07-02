import { GameObjects } from "phaser";

export default class CardBack extends GameObjects.Image{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
    }
}