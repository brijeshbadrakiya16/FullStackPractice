import { Cameras, Display, Scene } from "phaser";

export default class Example extends Scene {
    showCollidingTiles = true;
    showFaces = true;
    showTiles = false;
    helpText;
    map;
    debugGraphics;
    controls;

    constructor() {
        super("SuperMario");
        this.map = null;
        this.player = null;
        this.cursor = null;
    }

    preload() {
        this.load.spritesheet('player', 'assets/ch1.png', {
            frameWidth: 47,
            frameHeight: 77.75,
            startFrame: 0,
            endFrame: 19,
            margin: 0,
            spacing: 0,
        });
        this.load.spritesheet('playerJump', 'assets/ch1.png', {
            frameWidth: 47,
            frameHeight: 117,
            startFrame: 0,
            endFrame: 19,
            margin: 0,
            spacing: 0,
        });
        this.load.tilemapTiledJSON('map', 'https://cdn.phaserfiles.com/v410/assets/tilemaps/maps/super-mario.json');
        this.load.image('SuperMarioBros-World1-1', 'https://cdn.phaserfiles.com/v410/assets/tilemaps/tiles/super-mario.png');
        this.load.bitmapFont('gothic', 'https://cdn.phaserfiles.com/v410/assets/fonts/bitmap/gothic.png', 'https://cdn.phaserfiles.com/v410/assets/fonts/bitmap/gothic.xml');
    }

    create() {

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


        this.map = this.make.tilemap({ key: 'map' });
        const tileset = this.map.addTilesetImage('SuperMarioBros-World1-1');
        const layer = this.map.createLayer('World1', tileset, 0, 0);
        layer.setScale(2);

        this.map.setCollision([14, 15, 16, 20, 21, 22, 23, 24, 25, 27, 28, 29, 33, 39, 40]);

        this.debugGraphics = this.add.graphics();

        this.input.keyboard.on('keydown-ONE', event => {
            this.showTiles = !this.showTiles;
            this.drawDebug();
        });

        this.input.keyboard.on('keydown-TWO', event => {
            this.showCollidingTiles = !this.showCollidingTiles;
            this.drawDebug();
        });

        this.input.keyboard.on('keydown-THREE', event => {
            this.showFaces = !this.showFaces;
            this.drawDebug();
        });

        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            speed: 0.5
        };

        this.controls = new Cameras.Controls.FixedKeyControl(controlConfig);

        this.helpText = this.add.text(16, 16, this.getHelpMessage(), {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        });
        this.helpText.setScrollFactor(0);

        this.drawDebug();

        this.physics.add.collider(layer, this.player);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.player);
    }

    update(time, delta) {
        this.controls.update(delta);

        if (this.cursor.right.isDown) {
            if (this.player.body.velocity.x < 80) {
                this.player.play({ key: 'walk-start', repeat: 0, timeScale: 2 }, true);
            }
            this.player.setVelocityX(200);
            this.player.playAfterRepeat('running', 1);
        } else if(this.cursor.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.playAfterRepeat('running', 1);
        } else {
            this.player.setVelocityX(this.player.body.velocity.x > 0 ? this.player.body.velocity.x - 3 : 0);
            if (this.player.anims.currentAnim.key === "jump") {
                this.player.playAfterRepeat('idle', 1);
            } else {
                this.player.play('idle', true);
            }
        }

        if ((this.cursor.up.isDown || this.cursor.space.isDown)) {
            this.player.setVelocityY(-350);
            console.log("Debug");
            this.player.play({ key: 'jump', repeat: 0 }, true);
            // console.log(this.cameras.main);
            // console.log(this.cameras.main.scrollX);
            // console.log(this.bg1.x);
            // console.log(this.bg2.x);
        }
    }

    drawDebug() {
        const tileColor = this.showTiles ? new Display.Color(105, 210, 231, 200) : null;
        const colldingTileColor = this.showCollidingTiles ? new Display.Color(243, 134, 48, 200) : null;
        const faceColor = this.showFaces ? new Display.Color(40, 39, 37, 255) : null;

        this.debugGraphics.clear();

        // Pass in null for any of the style options to disable drawing that component
        this.map.renderDebug(this.debugGraphics, {
            tileColor: tileColor, // Non-colliding tiles
            collidingTileColor: colldingTileColor, // Colliding tiles
            faceColor: faceColor // Interesting faces, i.e. colliding edges
        });

        this.helpText.setText(this.getHelpMessage());
    }

    getHelpMessage() {
        return `Press 1 to toggle tiles: ${this.showTiles ? 'on' : 'off'}\nPress 2 to toggle colliding tiles: ${this.showCollidingTiles ? 'on' : 'off'}\nPress 3 to toggle interesting faces: ${this.showFaces ? 'on' : 'off'}`;
    }
}