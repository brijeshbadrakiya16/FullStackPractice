import { Scene, Math } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.score = 0;
        this.scoreText = null;

        this.doubleJump = false;
        this.t = Date.now();
    }

    preload() {
        this.load.setPath('assets');

        this.load.image('player_ship', 'Subject.png');

        this.load.image('card-back', 'card_back.png');
        this.load.image('card-front', 'card_Ace_Spade copy.png');

        // this.load.spritesheet('player',"sub6.png",{frameWidth:220,frameHeight:570});

        // We will use a built-in Phaser trick to generate a basic shape 
        // so you don't have to download a second image file yet!
    }

    flipCard() {
        this.cardBack.disableInteractive();

        this.tweens.add({
            targets: this.cardBack,
            scaleX: -0,
            duration: 150,
            ease: "Linear",
            onComplete: () => {
                this.cardBack.setVisible(false);
                this.cardFront.setVisible(true);

                this.tweens.add({
                    targets: this.cardFront,
                    scaleX: 1,
                    duration: 150,
                    ease: 'Linear',
                    onComplete: () => {
                        console.log('Card Flip Complete!');
                    }                    
                });
                this.cardFront.setInteractive();
            }
        })
    }
    flipCardBack() {
        this.cardFront.disableInteractive();
        
        this.tweens.add({
            targets: this.cardFront,
            scaleX: -0,
            duration: 150,
            ease: "Linear",
            onComplete: () => {
                this.cardFront.setVisible(false);
                this.cardBack.setVisible(true);
                
                this.tweens.add({
                    targets: this.cardBack,
                    scaleX: 1,
                    duration: 150,
                    ease: 'Linear',
                    onComplete: () => {
                        console.log('Card Flip Back Complete!');
                    }
                });

                this.cardBack.setInteractive();
                this.scene.start("DistributeCards");
            }
        })


    }
    
    create() {
        
        this.cardBack = this.add.sprite(400, 300, 'card-back').setInteractive();
        
        this.cardFront = this.add.sprite(400, 300, 'card-front');
        this.cardFront.setVisible(false);
        this.cardFront.setScale(0, 1);
        
        this.cardBack.on('pointerdown', () => this.flipCard());
        this.cardFront.on('pointerdown', () => this.flipCardBack());
        
        
        // 1. Create the Player
        this.player = this.physics.add.sprite(400, 300, 'player_ship');
        this.player.setCollideWorldBounds(true);
        this.player.setBounceY(0);
        this.player.setBounceX(0.6);

        // this.anims.create({
            //     key:"right",
            //     frames: this.anims.generateFrameNumbers('player',{start:0,end:2}),
            //     frameRate: 12,
            //     repeat: -1
            // })
            
            // 2. Create the Collectible Target (A little red circle)
            // Instead of loading an image, we draw a 15px circle dynamically
            const circleGraphics = this.make.graphics({ x: 0, y: 0, add: false });
            circleGraphics.fillStyle(0xff0000, 1);
            circleGraphics.fillCircle(15, 15, 10);
            circleGraphics.generateTexture('target_circle', 30, 30);
            
            // Place the target at a random spot on the screen
            this.target1 = this.physics.add.sprite(
                Math.Between(50, 750),
                Math.Between(0, 20),
                'target_circle'
            );
            // Targets shouldn't fall out of the sky, so turn off gravity for it!
            this.target1.body.setAllowGravity(false);
            
        this.target2 = this.physics.add.sprite(
            Math.Between(50, 750),
            Math.Between(0, 20),
            'target_circle'
        );
        // Targets shouldn't fall out of the sky, so turn off gravity for it!
        this.target2.body.setAllowGravity(false);

        this.target3 = this.physics.add.sprite(
            Math.Between(50, 750),
            Math.Between(0, 20),
            'target_circle'
        );
        // Targets shouldn't fall out of the sky, so turn off gravity for it!
        this.target3.body.setAllowGravity(false);

        // 3. UI Text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // 4. Keyboard Controls (Adding Spacebar for jumping)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,S,A,D');

        // 5. Collision Detection! 
        // This tells Phaser: "Every frame, check if player overlaps with target. If they do, run collectTarget()"
        this.physics.add.overlap(this.player, this.target1, this.collectTarget, null, this);
        this.physics.add.overlap(this.player, this.target2, this.collectTarget, null, this);
        this.physics.add.overlap(this.player, this.target3, this.collectTarget, null, this);

        this.target1.setCollideWorldBounds(true, 0.9, 0.9);
        this.target2.setCollideWorldBounds(true, 0.9, 0.9);
        this.target3.setCollideWorldBounds(true, 0.9, 0.9);

        this.target1.setAccelerationY(250);
        this.target2.setAccelerationY(220);
        this.target3.setAccelerationY(280);
        this.target1.setVelocityX(200)
        this.target2.setVelocityY(220)
        this.target3.setVelocityX(240)
    }

    update() {
        // Left/Right Movement
        if (this.cursors.left.isDown || this.input.keyboard.checkDown(this.keys["A"])) {
            this.player.setVelocityX(-400);
        } else if (this.cursors.right.isDown || this.input.keyboard.checkDown(this.keys["D"])) {
            this.player.setVelocityX(400);
            // this.player.anims.play('right',true);
        } else {
            this.player.setVelocityX(0);
        }

        // JUMPING / THRUSTING
        // We check if Spacebar (or Up Arrow) is pressed, AND if the player is touching the floor.
        // This prevents the player from infinitely jumping mid-air.

        if (Date.now() - this.t > 200 && Date.now() - this.t <= 1000 & this.doubleJump && (this.cursors.space.isDown || this.cursors.up.isDown || this.input.keyboard.checkDown(this.keys["W"]))) {
            this.player.setVelocityY(-300);
            this.doubleJump = false;
            return;
        }
        if ((this.cursors.space.isDown || this.cursors.up.isDown || this.input.keyboard.checkDown(this.keys["W"])) && this.player.body.blocked.down) {
            // this.player.setVelocityY(-400); // Negative Y velocity moves UPWARDS in game dev
            this.player.setVelocityY(-300);
            this.doubleJump = true;
            this.t = Date.now();
        }
    }

    // This function automatically gets triggered by our overlap check above

    collectTarget(player, target) {
        // Teleport the target to a brand new random location
        target.setPosition(
            Math.Between(50, 750),
            Math.Between(50, 550)
        );
        target.setAccelerationY(new Math.RandomDataGenerator().pick([250, 220, 280]));
        if (Math.Between(1, 10) % 2 == 0) {
            target.setVelocityX(new Math.RandomDataGenerator().pick([200, 220, 240]));
        } else {
            target.setVelocityY(new Math.RandomDataGenerator().pick([200, 220, 240]));
        }
        // Increase score and update the display text
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
    }
}