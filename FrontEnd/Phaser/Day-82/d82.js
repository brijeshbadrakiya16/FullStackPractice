// Day-82

// ___________________________________________________

// Date: 23/06/2026
// Task: Fixed some bugs in the infinite jumper game.
// - added slippery traction to player on move.
// - added varible obstactle rendering as to spacing depends on the score and randomness.
// - added increased speed to move with the increasing the score.
// - learned about how to make player collide with defined layer on tilemap
// - explored some other web game frameworks.

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "what can you do?",
    });
    console.log(response.text);
}

await main();