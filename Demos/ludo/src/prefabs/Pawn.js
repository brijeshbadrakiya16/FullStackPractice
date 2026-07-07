import { Filters, GameObjects } from "phaser"

export class Pawn extends GameObjects.Image {
    constructor(scene, x, y, texture, colorNumber) {
        super(scene, x, y, texture);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.2);

        this.pos = -1;
        this.colorNumber = colorNumber;
        this.setInteractive();
        this.enableFilters();
        
        scene.add.existing(this);

        this.filters.external.clear();
        

        // this.once('pointerdowm', (this) => {
        //     movePawn(this, number, turn, this.eachPlayer[this.turn].start);
        // }, scene);
        // this.off()
        // this.removeAllListeners()
    }

}