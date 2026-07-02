import { processAndCacheChunk } from "./endingAudio";
import { GoogleGenAI, Modality } from "@google/genai";

export const earlyCall = (scene) => {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GeminiApiKey });

    const model = 'gemini-3.1-flash-live-preview';
    // const model = 'gemini-3-flash-live';
    const config = { responseModalities: [Modality.AUDIO] };

    const main2 = async (prompt) => {

        if (!scene.audioContext) {
            scene.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: 24000
            });
        }
        console.log(scene.audioContext.state);

        let i = 1;

        scene.session = await ai.live.connect({
            model: model,
            callbacks: {
                onopen: function () {
                    console.debug('Opened');
                },
                onmessage: (message) => {
                    const content = message.serverContent;

                    // 1. Process and cache audio data parts as they stream in
                    if (content?.modelTurn?.parts) {
                        for (const part of content.modelTurn.parts) {
                            if (part.inlineData && part.inlineData.data) {
                                console.debug("Loading...");
                                processAndCacheChunk(scene, part.inlineData.data);
                            }
                        }
                    }

                    if (content?.turnComplete) {
                        scene.selfShow.setVisible(true);
                        scene.session?.close();
                    }
                },
                onerror: function (e) {
                    console.debug('Error:', e.message);
                },
                onclose: function (e) {
                    console.debug('Close:', e.reason);
                },
            },
            config: config,
        });

        console.debug("Session started");

        scene.session.sendRealtimeInput({
            text: prompt,
        });
    }

    const main = async () => {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: `Just Answer in StringifiedJson Format like: {win:"self",by:"Trio"} or {win:"opponent",by:"High Card"}, here self cards : ${scene.selfCardsNames.join(",")} and opponent cards : ${scene.opponentCardsNames.join(",")} , game: Teen Patti, follow all rules to compare as this is show case between self and opponent, answer in given format only...`,
        });
        // console.log(response.text);
        scene.winData = JSON.parse(response.text);

        if (scene.winData.win == "self") {
            await main2(`The Self(YOU) Player has won the game by ${scene.winData.by}, here self cards : ${scene.selfCardsNames.join(",")} and opponent cards : ${scene.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautiful comforting and informative ending + closing statement line, speak extreme funnier with clear and short and with appropriate winning conditions and appropriate referencing as "You" to self and "Opponent" to opponent, do not change the decision case as it has been completed...`);
            // await main2(`The Self(YOU) Player has won the game by ${data.by}, here self cards : ${scene.selfCardsNames.join(",")} and opponent cards : ${scene.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautifull comforting and informative ending + closing statement line, speak with full stamina and with max energy with appropriate winning conditions, indian tone and speak as how ravi-shastri speaks in criket commentry, do not change the decision case as it has been completed...`);
        } else {
            await main2(`The Opponent(OTHER) Player has won the game by ${scene.winData.by}, here self cards : ${scene.selfCardsNames.join(",")} and opponent cards : ${scene.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautiful comforting and informative ending + closing statement line, speak extreme funnier with clear and short and with appropriate winning conditions and appropriate referencing as "You" to self or "Opponent" to opponent, do not change the decision case as it has been completed...`);
            // await main2(`The Opponent(OTHER) Player has won the game by ${data.by}, here self cards : ${scene.selfCardsNames.join(",")} and opponent cards : ${scene.opponentCardsNames.join(",")}, game: Teen Patti, Speak a Beautifull comforting and informative ending + closing statement line, speak with full stamina and with max energy with appropriate winning conditions, indian tone and speak as how the ravi-shastri speaks in cricket commentry, do not change the decision case as it has been completed...`);
        }
    }

    main();
}