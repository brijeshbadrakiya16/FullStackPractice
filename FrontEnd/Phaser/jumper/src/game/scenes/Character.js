import { Scene } from "phaser";

export default class Character extends Scene{
    constructor(){
        super('Character');
        this.cursor = null;
        this.character = null;
    }
    preload(){
        this.load.spritesheet('character','/assets/charcter_anim.png',{frameWidth:137,frameHeight:136})
    }
    create(){
        this.character = this.physics.add.sprite(250,300,'character',0);
        this.character.setCollideWorldBounds(true);
        this.character.setGravity(0,-200);

        this.anims.create({
            key:"idea",
            frames: this.anims.generateFrameNumbers('character',{start:0,end:0}),
            frameRate:6,
            repeat: -1
        });
        this.anims.create({
            key:"down",
            frames: this.anims.generateFrameNumbers('character',{start:0,end:5}),
            frameRate:6,
            repeat: -1
        });
        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers('character',{start:6,end:11}),
            frameRate:6,
            repeat: -1
        });
        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers('character',{start:12,end:17}),
            frameRate:6,
            repeat: -1
        });
        this.anims.create({
            key:"up",
            frames: this.anims.generateFrameNumbers('character',{start:18,end:23}),
            frameRate:6,
            repeat: -1
        });

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.cursor.space.isDown || this.cursor.up.isDown){
            this.character.setVelocityY(-60);
            this.character.anims.play('up',true);
        }else if(this.cursor.down.isDown){
            this.character.setVelocityY(60);
            this.character.anims.play('down',true);
        }else{
            this.character.setVelocityY(0);
        }
        
        if(this.cursor.left.isDown){
            this.character.setVelocityX(-60);
            this.character.anims.play('left',true);
        }else if(this.cursor.right.isDown){
            this.character.setVelocityX(60);
            this.character.anims.play('right',true);
        }else{
            this.character.setVelocityX(0);
        }
    }
}