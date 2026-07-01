import { Scene, Math as math } from "phaser";

export default class DistributeCards extends Scene {
    constructor() {
        super('DistributeCards');
    }

    create() {
        // 1. Define Layout Positions
        this.deckPos = { x: 400, y: 300 }; // Center of screen

        // Coordinates for 3 players (Bottom-Left, Bottom-Center, Bottom-Right)
        this.playerPositions = [
            { x: 150, y: 530 }, // Player 1
            { x: 400, y: 530 }, // Player 2
            { x: 650, y: 530 }  // Player 3
        ];

        // 2. Game Setup Variables
        this.numPlayers = 3;
        this.cardsPerPlayer = 3;
        this.totalCardsToDeal = this.numPlayers * this.cardsPerPlayer;

        // 3. Create the Visual Deck (Stacking 5 cards closely to look like a thick bundle)
        this.deckGroup = this.add.group();
        for (let i = 0; i < 6; i++) {
            // Slightly offset each card by 1-2 pixels to create a 3D depth effect
            let deckCard = this.add.sprite(this.deckPos.x - (i * 1), this.deckPos.y - (i * 1), 'card-back');
            deckCard.setScale(0.4);
            this.deckGroup.add(deckCard);
        }

        // 4. Create a Start Button (Using standard Phaser text component)
        const startBtn = this.add.text(400, 100, 'DEAL CARDS', { fontSize: '24px', fill: '#0f0', backgroundColor: '#222', padding: 10 })
            .setOrigin(0.5)
            .setInteractive();

        startBtn.on('pointerdown', () => {
            startBtn.destroy(); // Remove button once dealing starts
            this.startDealingSequence();
        });
    }

    startDealingSequence() {
        // Start dealing from the 0th card
        this.dealCardRecursive(0);
    }

    dealCardRecursive(cardIndex) {
        // Base Case: If we have dealt all cards, stop the sequence!
        if (cardIndex >= this.totalCardsToDeal) {
            console.log("Dealing Complete!");
            this.cameras.main.shake(150, 0.005);
            return;
        }

        // Determine which player gets this card
        const targetPlayer = cardIndex % this.numPlayers;
        // Calculate how many cards this specific player has already received
        const roundNumber = Math.floor(cardIndex / this.numPlayers);
        const cardSpacing = Math.min(25,150/this.cardsPerPlayer); // 30 pixels apart

        const destination = {
            x: this.playerPositions[targetPlayer].x + (roundNumber * cardSpacing) - 60, // Centers the hand
            y: this.playerPositions[targetPlayer].y
        };

        // Create a new active card sprite right on top of the deck
        const flyingCard = this.add.sprite(this.deckPos.x, this.deckPos.y, 'card-back');
        flyingCard.setScale(0.4);

        // Give it a tiny random starting rotation so every card looks organic
        flyingCard.setAngle(math.Between(-5, 5));

        // Audio Trigger (Optional juice: Play a short card flick sound here)
        // this.sound.play('card-flick-sound');

        // Make the card fly!
        this.tweens.add({
            targets: flyingCard,
            x: destination.x,
            y: destination.y,
            angle: 0, // Straightens out perfectly as it arrives in hand
            scale: 0.3, // Slightly scale down if needed when arriving at the player HUD
            duration: 350, // Speed of flight (milliseconds)
            ease: 'Cubic.easeOut', // Fast departure, smooth deceleration landing
            onComplete: () => {
                // Once this specific card finishes its flight, trigger a tiny bounce effect
                this.tweens.add({
                    targets: flyingCard,
                    y: destination.y + 5,
                    duration: 50,
                    yoyo: true,
                    ease: 'Quad.easeInOut'
                });

                // CRITICAL: Call the function again for the NEXT card index
                // This creates a rhythmic, sequential dealing effect
                this.time.delayedCall(100, () => {
                    this.dealCardRecursive(cardIndex + 1);
                });
            }
        });
    }
}