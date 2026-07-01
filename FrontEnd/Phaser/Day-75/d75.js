// Day-75

// Date: 15/06/2026
// Task: Started Learning about Phaser.
// - Research about phaser and seen how it works and what it is to create web based game.
// - Created sample project to learn about fundamentals of phaser with react@vite.
// - Learned about scene, character rendering, character movements in 2d space, gravity physics and velocity.
// - Tried to animate with sprite sections.

// ____________________________________________
// Started Learning and gathering info about phaser.


// ************************************************************************************************************


// ! 1. The Core Concept: The "Game Loop"
// Unlike web apps or regular software where code only runs when a user clicks something, video games are constantly running an infinite loop, usually 60 times per second.

// Every single frame, the game executes three core steps:

// Preload: Loads up all your assets (images, audio, spritesheets) into the computer's memory.

// Create: Sets up the initial game world (places your player, turns on physics, builds the map).

// Update: The heart of the game. It listens for keyboard inputs, checks for player movement, calculates collisions, and updates the screen.

// ! 2. Phaser’s Building Blocks
// When you write a Phaser game, you’ll spend 90% of your time dealing with these specific concepts:

// Scenes
// Think of Scenes as the different screens or levels of your game. You’ll have a MainMenuScene, a Level1Scene, and a GameOverScene. They are entirely self-contained, meaning you can stop one, start another, or even run them on top of each other (like putting a pause menu scene over your active gameplay scene).

// Game Objects
// Anything you can see on the screen is a Game Object. This includes:

// Sprites: Images that can move, rotate, and animate (like your main character).

// Static Images: Backgrounds or UI elements that don’t need complex animations.

// Text: Score counters, dialogue boxes, or health bars.

// ? Physics Engines
// Phaser has built-in physics systems so you don't have to manually code gravity or bounce vectors. The two most common are:

// ? Arcade Physics: Perfect for beginners. It handles simple AABB (Axis-Aligned Bounding Box) collisions. Everything is treated as a non-rotating rectangle or circle. It's incredibly fast and perfect for platformers like Mario or top-down games like Zelda.

// ? Matter.js: A much more advanced, realistic physics engine that supports complex shapes, joints, springs, and realistic weight/bouncing.

// ! 3. How Phaser Code Actually Looks
// Here is a bare-bones template of a Phaser game so you can see how those concepts map to real JavaScript code:

// JavaScript
// // 1. Configure your game settings
// const config = {
//     type: Phaser.AUTO, // Automatically chooses WebGL or Canvas rendering
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: { gravity: { y: 300 } } // Adds downward gravity
//     },
//     scene: { preload: preload, create: create, update: update }
// };

// // 2. Start the game instance
// const game = new Phaser.Game(config);

// function preload() {
//     // Load an image and name it 'player_ship'
//     this.load.image('player_ship', 'assets/ship.png');
// }

// function create() {
//     // Place the player at coordinates X: 400, Y: 100
//     this.player = this.physics.add.sprite(400, 100, 'player_ship');
    
//     // Set up keyboard tracking
//     this.cursors = this.input.keyboard.createCursorKeys();
// }

// function update() {
//     // This runs 60 times a second. If left arrow is down, move left!
//     if (this.cursors.left.isDown) {
//         this.player.setVelocityX(-160);
//     } else if (this.cursors.right.isDown) {
//         this.player.setVelocityX(160);
//     } else {
//         this.player.setVelocityX(0);
//     }
// }

// ! 4. Useful Tools: Phaser Actions
// As you look around the documentation, you'll see a section called Phaser.Actions. These are built-in helper functions designed to save you tons of time when managing groups of items.

// Instead of writing complex math loops yourself, you can use these shortcuts to manipulate arrays of Game Objects instantly:

// GridAlign: Instantly arranges a list of items (like inventory slots or enemy grids) into a clean row-and-column layout.

// PlaceOnCircle / PlaceOnLine: Evenly spaces objects across geometric paths. Great for patterns of collectible coins or spinning obstacles.

// SetXY / IncXY: Moves or shifts large batches of elements simultaneously.

// ! 5. Your Roadmap to Learn
// Since you are starting from absolute scratch, here is the path I highly recommend to avoid getting overwhelmed:

// Master the Basics of JavaScript: You don't need to be a genius, but you should comfortably understand variables, functions, arrays, objects, and if/else statements.

// Build a "Clone" First: Do not try to build your dream multiplayer RPG on day one. Start by making Pong, then Flappy Bird, then a basic 2D Platformer.

// Look at Examples: The Phaser community is massive. The official documentation has thousands of live code snippets you can play with and tweak in real-time.

