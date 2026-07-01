import { Math, Scene } from "phaser";
// 2-480 h-640

export default class InfiniteJump extends Scene {
    constructor() {
        super("InfiniteJump")
        this.bg1 = null;
        this.bg2 = null;
        this.bg3 = null;
        this.bg4 = null;
        this.bg5 = null;
        this.bg6 = null;
        this.bg7 = null;
        this.bg8 = null;

        this.tileArray = null;

        this.player = null;
        this.cursor = null;

        this.triangleGraphic = null;
        this.obstacle = null;

        this.triangleObstacle1 = null;

        this.obstacleSpacing = [340, 300, 440, 270];

        this.canPlay = true;

        this.text = null;

        this.gameOverText = null;
        this.gameOverHint = null;

        this.prev = null;

        this.playerVelocity = 150;

        this.math = new Math.RandomDataGenerator();
    }

    preload() {
        this.load.image('tile', 'assets/tile.png');
        this.load.spritesheet('player', 'assets/ch1.png', {
            frameWidth: 47,
            frameHeight: 77.75,
            startFrame: 0,
            endFrame: 19,
            margin: 0,
            spacing: 0,
        }); //w-47 h-87.75
        this.load.spritesheet('playerJump', 'assets/ch1.png', {
            frameWidth: 47,
            frameHeight: 117,
            startFrame: 0,
            endFrame: 19,
            margin: 0,
            spacing: 0,
        }); //w-47 h-87.75

    }

    create() {
        // console.log(this.canPlay);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "walk-start",
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: "running",
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
            frameRate: 5,
            repeat: -1
        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers('playerJump', { start: 10, end: 14 }),
            frameRate: 2,
            repeat: 0
        })

        this.player = this.physics.add.sprite(100, 300, 'player');
        // this.player.setCollideWorldBounds();
        // this.player.body.mass = 500000;
        this.player.setGravityY(500);
        // console.log(this.player.body.mass);
        this.player.setDebug(true, true, 0xffff00);
        this.player.setBodySize(37, 77);
        // this.player.setCollideWorldBounds();
        this.player.play('idle', true);

        // this.player.set

        this.bg1 = this.physics.add.image(38, 602, 'tile').setScale(0.3);
        this.bg2 = this.physics.add.image(this.bg1.x + 77, 602, 'tile').setScale(0.3);
        this.bg3 = this.physics.add.image(this.bg2.x + 77, 602, 'tile').setScale(0.3);
        this.bg4 = this.physics.add.image(this.bg3.x + 77, 602, 'tile').setScale(0.3);
        this.bg5 = this.physics.add.image(this.bg4.x + 77, 602, 'tile').setScale(0.3);
        this.bg6 = this.physics.add.image(this.bg5.x + 77, 602, 'tile').setScale(0.3);
        this.bg7 = this.physics.add.image(this.bg6.x + 77, 602, 'tile').setScale(0.3);
        this.bg8 = this.physics.add.image(this.bg7.x + 77, 602, 'tile').setScale(0.3);
        this.bg9 = this.physics.add.image(this.bg8.x + 77, 602, 'tile').setScale(0.3);
        this.bg10 = this.physics.add.image(this.bg9.x + 77, 602, 'tile').setScale(0.3);
        this.bg11 = this.physics.add.image(this.bg10.x + 77, 602, 'tile').setScale(0.3);

        this.bg1.setImmovable(true);
        this.bg2.setImmovable(true);
        this.bg3.setImmovable(true);
        this.bg4.setImmovable(true);
        this.bg5.setImmovable(true);
        this.bg6.setImmovable(true);
        this.bg7.setImmovable(true);
        this.bg8.setImmovable(true);
        this.bg9.setImmovable(true);
        this.bg10.setImmovable(true);
        this.bg11.setImmovable(true);

        this.bg1.setGravityY(-9.81);
        this.bg2.setGravityY(-9.81);
        this.bg3.setGravityY(-9.81);
        this.bg4.setGravityY(-9.81);
        this.bg5.setGravityY(-9.81);
        this.bg6.setGravityY(-9.81);
        this.bg7.setGravityY(-9.81);
        this.bg8.setGravityY(-9.81);
        this.bg9.setGravityY(-9.81);
        this.bg10.setGravityY(-9.81);
        this.bg11.setGravityY(-9.81);

        this.bg1.setDebug(false);
        this.bg2.setDebug(false);
        this.bg3.setDebug(false);
        this.bg4.setDebug(false);
        this.bg5.setDebug(false);
        this.bg6.setDebug(false);
        this.bg7.setDebug(false);
        this.bg8.setDebug(false);
        this.bg9.setDebug(false);
        this.bg10.setDebug(false);
        this.bg11.setDebug(false);

        // this.tileArray = [this.bg1,this.bg2,this.bg3,this.bg4,this.bg5,this.bg6,this.bg7,this.bg8];
        this.tileArray = [this.bg11, this.bg10, this.bg9, this.bg8, this.bg7, this.bg6, this.bg5, this.bg4, this.bg3, this.bg2, this.bg1];

        // this.bg1.setCollideWorldBounds();
        // this.bg2.setCollideWorldBounds();
        // this.bg3.setCollideWorldBounds();
        // this.bg4.setCollideWorldBounds();
        // this.bg5.setCollideWorldBounds();
        // this.bg6.setCollideWorldBounds();
        // this.bg7.setCollideWorldBounds();
        // this.bg8.setCollideWorldBounds();

        this.physics.add.collider(this.player, this.bg1);
        this.physics.add.collider(this.player, this.bg2);
        this.physics.add.collider(this.player, this.bg3);
        this.physics.add.collider(this.player, this.bg4);
        this.physics.add.collider(this.player, this.bg5);
        this.physics.add.collider(this.player, this.bg6);
        this.physics.add.collider(this.player, this.bg7);
        this.physics.add.collider(this.player, this.bg8);
        this.physics.add.collider(this.player, this.bg9);
        this.physics.add.collider(this.player, this.bg10);
        this.physics.add.collider(this.player, this.bg11);


        this.cursor = this.input.keyboard.createCursorKeys();


        this.cameras.main.setBounds(0, 0, 9999999, 640);
        this.cameras.main.startFollow(this.player, true, 1, 0);
        // this.cameras.main.setDeadzone(150,640)

        this.triangleGraphic = this.make.graphics({ x: 0, y: 0, add: false });
        this.triangleGraphic.fillStyle(0x00ff00, 1);
        this.triangleGraphic.fillTriangle(10, 0, 0, 20, 20, 20);
        this.triangleGraphic.generateTexture('triangle_small', 20, 20);

        this.triangleGraphic.clear()
        this.triangleGraphic.fillStyle(0x00ff00, 1);
        this.triangleGraphic.fillTriangle(16, 0, 0, 32, 32, 32);
        this.triangleGraphic.generateTexture('triangle_mid', 32, 32);

        this.triangleGraphic.clear()
        this.triangleGraphic.fillStyle(0x00ff00, 1);
        this.triangleGraphic.fillTriangle(25, 0, 0, 50, 50, 50);
        this.triangleGraphic.generateTexture('triangle_big', 50, 50);


        const triangleObstacle1 = this.physics.add.sprite(300, 553, 'triangle_small');
        triangleObstacle1.body.setImmovable(true);
        triangleObstacle1.setGravityY(-9.81);
        triangleObstacle1.setCircle(10);
        triangleObstacle1.setMass(50000);
        this.physics.add.collider(this.player, triangleObstacle1, this.handleCollider, undefined, this);

        this.obstacle = [triangleObstacle1];

        for (let x of this.obstacleSpacing) {
            const type = this.math.pick(['triangle_small', 'triangle_mid', 'triangle_big']);
            const triangleObstacle2 = this.physics.add.sprite(this.obstacle[0].x + x, type == 'triangle_small' ? 553 : type == "triangle_mid" ? 547 : 538, type);
            triangleObstacle2.body.setImmovable(true);
            triangleObstacle2.setGravityY(-9.81);
            triangleObstacle2.setCircle(type == 'triangle_small' ? 10 : type == "triangle_mid" ? 16 : 25);
            triangleObstacle2.body.setMass(50000);

            this.obstacle.unshift(triangleObstacle2);
            this.physics.add.collider(this.player, triangleObstacle2, this.handleCollider, undefined, this);
        }


        this.text = this.add.text(15, 8, 'Score : 0', { fontSize: '20px', color: "#ffffff", fontFamily: "arial", fontStyle: 'bold' });
        this.text.setScrollFactor(0);

        this.gameOverText = this.add.text(100, 150, 'GAMEOVER', { fontSize: '50px', color: "#ff0000", fontFamily: "arial", fontStyle: 'bold' });
        this.gameOverHint = this.add.text(180, 200, 'press Enter to Play Again', { fontSize: '12px', color: "#000", fontFamily: "arial" });
        this.gameOverText.setScrollFactor(0);
        this.gameOverHint.setScrollFactor(0);
        this.gameOverText.setVisible(false);
        this.gameOverHint.setVisible(false);

    }

    update() {

        if (this.cameras.main.scrollX > this.obstacle.at(-1).x + 80) {
            const triangle = this.obstacle.pop();
            triangle.removeCollidesWith(this.player);
            triangle.removeFromDisplayList();
            triangle.removeFromUpdateList();
            triangle.removedFromScene();
            triangle.body.enable = false;
            triangle.destroy();

            const type = this.math.pick(['triangle_small', 'triangle_mid', 'triangle_big']);
            const placeX = this.math.pick(this.obstacleSpacing);
            const triangleObstacle2 = this.physics.add.sprite(this.obstacle[0].x + placeX, type == 'triangle_small' ? 553 : type == "triangle_mid" ? 547 : 538, type);
            triangleObstacle2.body.setImmovable(true);
            triangleObstacle2.setGravityY(-9.81);
            triangleObstacle2.setCircle(type == 'triangle_small' ? 10 : type == "triangle_mid" ? 16 : 25);
            triangleObstacle2.setMass(50000);

            this.obstacle.unshift(triangleObstacle2);
            this.physics.add.collider(this.player, triangleObstacle2, this.handleCollider, undefined, this);
        }
        // if(this.cameras.main.scrollX > this.tileArray[1].x){
        //     let tile = this.tileArray.shift();
        //     tile.x = this.tileArray.at(-1).x+77;
        //     this.tileArray.push(tile);
        // }
        if (this.cameras.main.scrollX > this.tileArray[6].x) {
            let tile = this.tileArray.pop();
            if (this.cameras.main.scrollX - this.tileArray[0].x > 400) {
                tile.x = this.cameras.main.scrollX + 400;
            } else {
                tile.x = this.tileArray[0].x + 76;
            }
            this.tileArray.unshift(tile);
        }

        if (this.canPlay) {

            if (this.cursor.right.isDown) {
                if (this.player.body.velocity.x < 80) {
                    this.player.play({ key: 'walk-start', repeat: 0, timeScale: 2 }, true);
                }
                this.player.setVelocityX(this.playerVelocity);
                this.player.playAfterRepeat('running', 1);
            } else {
                this.player.setVelocityX(this.player.body.velocity.x > 0 ? this.player.body.velocity.x - 3 : 0);
                if (this.player.anims.currentAnim.key === "jump") {
                    this.player.playAfterRepeat('idle', 1);
                } else {
                    this.player.play('idle', true);
                }
            }

            if ((this.cursor.up.isDown || this.cursor.space.isDown) && (this.player.body.touching.down)) {
                this.player.setVelocityY(-350);
                this.player.play({ key: 'jump', repeat: 0, timeScale: 2 }, true);
                // console.log(this.cameras.main);
                // console.log(this.cameras.main.scrollX);
                // console.log(this.bg1.x);
                // console.log(this.bg2.x);
            }

        } else {
            if (this.input.keyboard.addKey('enter').isDown) {
                this.anims.remove('idle');
                this.anims.remove('walk-start');
                this.anims.remove('running');
                this.anims.remove('jump');
                this.canPlay = true;
                this.obstacleSpacing = [340, 300, 440, 270];
                this.playerVelocity = 150;

                this.bg1 = null;
                this.bg2 = null;
                this.bg3 = null;
                this.bg4 = null;
                this.bg5 = null;
                this.bg6 = null;
                this.bg7 = null;
                this.bg8 = null;

                this.tileArray = null;

                this.player = null;
                this.cursor = null;

                this.triangleGraphic = null;
                this.obstacle = null;

                this.triangleObstacle1 = null;

                this.canPlay = true;

                this.gameOverText = null;
                this.gameOverHint = null;

                this.prev = null;

                console.log(`Prev Score ${parseInt(this.cameras.main.scrollX / 20)}`);
                this.scene.start('InfiniteJump');
            }
        }

        this.text.setText(`Score : ${parseInt(this.cameras.main.scrollX / 20)}`);

        if (this.prev !== parseInt(this.cameras.main.scrollX / 20) && parseInt(this.cameras.main.scrollX / 20) % 20 == 0) {
            this.prev = parseInt(this.cameras.main.scrollX / 20);
            if (this.obstacleSpacing[0] > 200) {
                this.obstacleSpacing = this.obstacleSpacing.map(x => x - 5);
            }
            this.playerVelocity += 10;
            // console.log(this.obstacleSpacing);
        }
    }

    handleCollider() {
        this.canPlay = false;
        this.player.play('idle', true);
        this.player.setVelocity(0);

        this.gameOverHint.setVisible(true);
        this.gameOverText.setVisible(true);
    }
}