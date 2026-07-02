export const processAndCacheChunk = (scene, base64String) => {
    const binaryString = window.atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const numSamples = bytes.length / 2;
    const dataView = new DataView(bytes.buffer);
    const float32Array = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const int16Sample = dataView.getInt16(i * 2, true);
        float32Array[i] = int16Sample / 32768.0;
    }

    // Push scene single processed chunk array into our storage array
    scene.audioChunks.push(float32Array);
};

export const playFullAccumulatedAudio = (scene) => {
    if (scene.audioContext.state === 'suspended') {
        scene.audioContext.resume();
    }

    if (!scene.audioChunks || scene.audioChunks.length === 0) {
        console.warn("⚠️ No audio chunks accumulated to play.");
        return;
    }

    // 1. Force totalSamples to be a strict integer
    let totalSamples = 0;
    for (const chunk of scene.audioChunks) {
        if (chunk && chunk.length) {
            totalSamples += chunk.length;
        }
    }
    totalSamples = Math.floor(totalSamples);

    // 2. Extra guard: Validate against 0, NaN, or Infinity
    if (totalSamples <= 0 || !Number.isInteger(totalSamples)) {
        console.warn("⚠️ Invalid total samples calculation:", totalSamples);
        scene.audioChunks = [];
        return;
    }

    try {
        const combinedFloatArray = new Float32Array(totalSamples);

        let offset = 0;
        for (const chunk of scene.audioChunks) {
            // Ensure we don't copy past the allocated boundary
            if (offset + chunk.length <= totalSamples) {
                combinedFloatArray.set(chunk, offset);
                offset += chunk.length;
            }
        }

        // Clear the cache immediately for the next turn
        // scene.audioChunks = [];

        // 3. Make absolutely sure SAMPLE_RATE is a valid integer too
        const sampleRate = Math.floor(scene.SAMPLE_RATE) || 24000;

        // 4. Create the buffer safely
        const audioBuffer = scene.audioContext.createBuffer(1, totalSamples, sampleRate);
        audioBuffer.getChannelData(0).set(combinedFloatArray);

        scene.bufferSource = scene.audioContext.createBufferSource();
        scene.bufferSource.buffer = audioBuffer;
        scene.bufferSource.connect(scene.audioContext.destination);

        scene.bufferSource.start(0);
        console.log(`🔊 Playing unified voice response (${totalSamples} samples)`);

    } catch (error) {
        console.error("❌ Error constructing or playing full audio buffer:", error);
        scene.audioChunks = []; // Clean up on failure
    }
}