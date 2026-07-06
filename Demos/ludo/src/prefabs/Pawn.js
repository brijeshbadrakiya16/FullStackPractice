import { GameObjects } from "phaser"

export class Pawn extends GameObjects.Image {
    constructor(scene,x,y,texture){
        super(scene,x,y,texture);

        this.setOrigin(0.5,0.5);
        this.setScale(0.2);

        this.pos = -1;

        scene.add.existing(this);
    }

}