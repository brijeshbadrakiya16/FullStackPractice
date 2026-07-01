import { Math, Scene } from 'phaser';
import Carrot from './Carrot';

export class Game extends Scene {

    constructor() {
        super('Game');

        this.player = null;
        this.cursor = null;
        this.platforms = null;
        this.carrots = null;
        this.carrotsCollected = 0;
        this.carrotsCollectedText = null;
        this.readyForDoubleJump = false;
    }

    preload() {
        this.load.setPath('assets/kenney_jumper-pack');

        this.load.image('background', 'PNG/Background/bg_layer1.png');
        // this.load.image('logo', 'logo.png');
        this.load.image('platform', 'PNG/Environment/ground_grass.png');
        
        this.load.image('bunny-stand', 'PNG/Players/bunny1_stand.png');
        this.load.image('bunny-ready', 'PNG/Players/bunny1_ready.png');
        
        this.load.image('carrot',"PNG/Items/carrot.png");
        
        this.load.image('bunny-jump','PNG/Players/bunny1_jump.png');

    }
    
    create() {
        this.cursor = this.input.keyboard.createCursorKeys();
        
        this.add.image(240, 320, 'background').setScrollFactor(1,0);
        
        this.platforms = this.physics.add.staticGroup();
        
        for (let i = 0; i < 5; ++i) {
            const x = Math.Between(80, 400);
            const y = 150 * i;

            const platform = this.platforms.create(x, y, 'platform')
            platform.scale = 0.5;

            const body = platform.body;
            body.updateFromGameObject();
        }

        this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5);

        this.physics.add.collider(this.platforms, this.player);


        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setDeadzone(this.scale.width * 1.5);

        // const carrot = new Carrot(this,240,320,'carrot');
        // this.add.existing(carrot);

        this.carrots = this.physics.add.group({
            classType:Carrot,
        })

        this.physics.add.collider(this.platforms,this.carrots);

        this.physics.add.overlap(
            this.player,
            this.carrots,
            this.handleCollectCarrot,
            undefined,
            this
        )

        const style = {color: "#000", fontSize:24};
        this.carrotsCollectedText = this.add.text(240,10,"Carrots: 0",style).setScrollFactor(0).setOrigin(0.5,0);

        this.add.text(30,100,"Go to Image Scene",{backgroundColor:"red",color:"white",padding:15}).setOrigin(0).setInteractive().on('pointerdown',()=>{
            console.log("Clicked");
            this.scene.start('Night');
        });
    }

    update(t, dt) {

        this.platforms.children.forEach(child => {
            const platform = child;
            const scrollY = this.cameras.main.scrollY;

            if (platform.y >= scrollY + 700) {
                platform.y = scrollY - Math.Between(50, 75);
                platform.body.updateFromGameObject();

                this.addCarrotAbove(platform);
            }
        })

        if(this.player.body.touching.down && (this.cursor.up.isUp || this.cursor.space.isUp)){
            this.player.setTexture('bunny-ready');
        }

        if (this.player.body.touching.down && (this.cursor.up.isDown || this.cursor.space.isDown)) {
            this.player.setTexture('bunny-jump');
            this.player.setVelocityY(-300);
            this.readyForDoubleJump = true;
        }

        const vy = this.player.body.velocity.y
        
        if(this.readyForDoubleJump && !this.player.body.touching.down && vy>-20 && (this.cursor.space.isDown || this.cursor.up.isDown)){
            this.readyForDoubleJump = false;
            this.player.setTexture('bunny-jump');
            this.player.setVelocityY(-300);
        }

        if(vy>0 && this.player.texture.key !== 'bunny-stand'){
            this.player.setTexture('bunny-stand');
        }

        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        this.horizontalWrap(this.player);

        const bottomPlatform = this.findBottomMostPlatForm();
        if(this.player.y > bottomPlatform.y + 200){
            // console.log("Game Over");
            this.scene.start('game-over');
        }
    }

    horizontalWrap(sprite){
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;

        if(sprite.x < -halfWidth){
            sprite.x = gameWidth + halfWidth;
        }else if(sprite.x > gameWidth + halfWidth){
            sprite.x = -halfWidth;
        }
    }

    addCarrotAbove(sprite){
        const y = sprite.y - sprite.displayHeight;

        const carrot = this.carrots.get(sprite.x,y,'carrot');

        carrot.setActive(true);
        carrot.setVisible(true);
        this.physics.add.overlap(this.player,carrot,this.handleCollectCarrot,undefined,this);

        this.add.existing(carrot);

        carrot.body.setSize(carrot.width,carrot.height);

        return carrot;
    }

    handleCollectCarrot(player, carrot){
        this.carrots.killAndHide(carrot);

        this.physics.world.disableBody(carrot.body);

        this.carrotsCollected++;

        const value= `Carrot: ${this.carrotsCollected}`;
        this.carrotsCollectedText.text = value;
    }

    findBottomMostPlatForm(){
        const platforms = this.platforms.getChildren();

        let bottomPlatform = platforms[0];

        for(let i=1; i<platforms.length; ++i){
            const platform = platforms[i]

            if(platform.y < bottomPlatform.y){
                continue
            }
            bottomPlatform = platform; 
        }

        return bottomPlatform;
    }
}
