// Day-50

// Date: 08/05/2026
// Task: Searched and read about different algorithms to generate numbers randomly, as read about physical noise/entropy, crypto safe or not, learned in depth about mersenne twister algo, as i cam up a solution to make it unpredictable after 624 operation giving a entire new seed, but it takes time and still though it can be reverse engineered, also while reading i get to know about australian institute site which provides api that produces random bit as per fluctuation in there lab experiment, and also learned about chacha20 and tried it also as it is more crypto safe and unpredictable as it have 20 rounds of shuffling it's result to become entire new.

// ________________________________________________________

// Mersenne Twister

// The ** Mersenne Twister ** is one of the most widely used pseudorandom number generators(PRNGs) in computer science.Developed in 1997 by Makoto Matsumoto and Takuji Nishimura, it is the default PRNG in Python, Ruby, PHP, MATLAB, and C++ (via`std::mt19937`).

// To understand it in depth, we have to look at both the mathematics that give it its massive period and the bitwise operations that make it incredibly fast.

// Here is a deep dive into how the algorithm works.

// ---

// ### 1. The Name and The Period

// The name comes from its period length(the number of random values it generates before the sequence repeats itself).The standard implementation, ** MT19937 **, has a period of:


// $$2 ^ { 19937} - 1$$

// This number is a ** Mersenne Prime ** (a prime number that is one less than a power of two). A period this large is practically infinite for human applications; if you generated a billion random numbers a second, the universe would end before the sequence repeated.

// ### 2. The Core Architecture

// The Mersenne Twister is a type of *generalized feedback shift register *.It doesn't generate a new number completely from scratch every time you ask for one. Instead, it maintains a massive internal "state" and draws from it.

// The algorithm is broken down into three distinct phases:

// #### Phase A: Initialization(Seeding)

// The algorithm requires an initial state array.For MT19937, this array consists of ** 624 ** 32 - bit integers.
// When you provide a single "seed" value, the algorithm puts that seed in the first slot of the array.It then uses a simpler, secondary generator(usually a Linear Congruential Generator) to mathematically cascade that seed and fill up the remaining 623 slots.

// #### Phase B: The "Twist"(State Generation)

// Once the state array of 624 integers is initialized(or once all 624 numbers have been used up by the program), the algorithm performs the "Twist." This is a mathematical transformation applied to the entire array to generate the * next * batch of 624 numbers.

// The formula to generate the next state is:


// $$x_k = x_{ k + m } \oplus((x_k ^ u \mid x_{ k+ 1}^ l) A) $$

// Here is what that means in plain English:

// 1. ** Concatenation:** It takes the upper bits($u$) of the current number $x_k$ and merges them with the lower bits($l$) of the next number $x_{ k + 1 } $.
// 2. ** Matrix Multiplication($A$):** If the lowest bit of this new combined number is 1, it undergoes a bitwise XOR($\oplus$) with a specific "magic" constant matrix $A$.If it's 0, it does nothing. This makes the operation lightning-fast on modern CPUs.
// 3. ** Feedback($m$):** The result is then XORed with a number from halfway across the array($x_{ k+ m}$, where $m = 397$).
// 4. This new value replaces the old $x_k$, and the algorithm moves to the next number.

// #### Phase C: Tempering(Extraction)

// You might think the algorithm just hands you the twisted numbers from the array one by one.Not quite.The numbers inside the state array suffer from a statistical flaw: their bits are highly correlated to the numbers around them.

// To fix this, whenever you request a random number, the Mersenne Twister takes the next available number from the state array and "tempers" it.Tempering scrambles the bits using a series of right and left bit - shifts and XOR operations to ensure the final output is uniformly distributed.

// The tempering equations for a 32 - bit integer $y$ look like this:


// $$y = y \oplus(y \gg 11)$$

// $$y = y \oplus((y \ll 7) \text{ AND } \text{ 0x9D2C5680 }) $$

// $$y = y \oplus((y \ll 15) \text{ AND } \text{ 0xEFC60000 }) $$

// $$y = y \oplus(y \gg 18)$$

// The final $y$ is the random number returned to your code.

// ### 3. Strengths and Weaknesses

//     ** Strengths:**

// * ** Massive Period:** $2 ^ { 19937} - 1$ guarantees no repetition in practical use.
// * ** High Dimensional Equidistribution:** It passes the stringent "Diehard tests" for randomness.If you map the numbers to coordinates in 623 - dimensional space, they are perfectly distributed.
// * ** Speed:** Because it relies entirely on bitwise operations(AND, OR, XOR, Bit - shifts) rather than division or complex math, it is incredibly fast.

// ** Weaknesses:**

// * ** Not Cryptographically Secure:** This is the most crucial caveat.Because the state array is completely deterministic based on the linear recurrence, if an attacker observes ** 624 consecutive outputs **, they can reverse - engineer the entire internal state.Once they have the state, they can predict every future number the generator will ever produce. (For security, you must use algorithms like`/dev/urandom` or AES - CTR).
// * ** Memory Footprint:** Holding 624 32 - bit integers takes about 2.5 Kilobytes of memory.While trivial for a modern PC, it can be too large for tiny embedded systems or microcontrollers.

// ---

//     To help solidify the most abstract parts of this algorithm—the ** Twist ** and the ** Temper **—I have generated an interactive visualizer below.You can step through the exact bitwise operations that transform these numbers to see how the algorithm achieves its randomness.

// ________________________________________________________

// NIST SP 800-90A
// -> HMAC_DRBG
// -> HASH_DRBG (sha-256 / sha-512)


// High quality entropy from anywhere

// from any third-party source which is certified
// go to https://qrng.anu.edu.au
// and access live numbers from menu see all the available different thing


// ________________________________________________________

const crypto = require("crypto");

// function chacha20RandomNumbers(count, max) {
//     if (!Number.isInteger(count) || count <= 0) {
//         throw new Error("Count must be a positive integer");
//     }
//     if (!Number.isInteger(max) || max <= 0) {
//         throw new Error("Max must be a positive integer");
//     }

//     const key = crypto.randomBytes(32);
//     const nonce = crypto.randomBytes(12);

//     const cipher = crypto.createCipheriv('chacha20-poly1305', key, nonce);

//     const randomBytes = cipher.update(crypto.randomBytes(count * 4));

//     const numbers = [];

//     for (let i = 0; i < count; i++) {
//         const num = randomBytes.readUint32LE(i * 4);
//         numbers.push(num % max);
//     }

//     return numbers;
// }
// setInterval(()=>{
//     try {
//         const randomNums = chacha20RandomNumbers(1, 6);
//         console.log("Random numbers:", randomNums[0]+1);
//     } catch (err) {
//         console.error("Error:", err.message);
//     }
// },1000);


const MersenneTwister = require('mersenne-twister');

// class SecureMersenne {
//     constructor() {
//         this.generator = new MersenneTwister();
//         this.pullCount = 0;
//         this.reseed();
//     }

//     reseed() {
//         // Pull 32 bits (4 bytes) of "true" entropy from the OS
//         const seedBuffer = crypto.randomBytes(4);
//         const seed = seedBuffer.readUInt32BE();

//         this.generator.init_seed(seed);
//         this.pullCount = 0; // Reset counter
//         console.log("--- Reseeded MT with fresh entropy ---");
//     }

//     random() {
//         // Before hitting the 624-number limit, reseed
//         if (this.pullCount >= 624) {
//             this.reseed();
//         }

//         this.pullCount++;
//         return this.generator.random(); // Returns [0, 1)
//     }
// }

// const rng = new SecureMersenne();
// setInterval(() => {
//     console.log(rng.random() * 6);
// }, 500);


// class ChaChaRNG {
//     constructor() {
//         // ChaCha20 requires a 32-byte key and a 12-byte nonce
//         this.key = crypto.randomBytes(32);
//         this.nonce = crypto.randomBytes(12);
//         this.counter = 0;
//     }

//     // Generates a 32-bit unsigned integer (0 to 4,294,967,295)
//     randomInt() {
//         // We encrypt a buffer of zeros using ChaCha20. 
//         // The resulting "ciphertext" is actually just random bytes.
//         const input = Buffer.alloc(4); // 4 bytes for 32-bit int
//         const cipher = crypto.createCipheriv('chacha20-poly1305', this.key, this.nonce);

//         // Use the counter to ensure the block is unique
//         // (Built-in createCipheriv handles the internal counter)
//         const output = cipher.update(input);
//         return output.readUInt32LE();
//     }

//     // Normalized [0, 1) to match Math.random()
//     random() {
//         return this.randomInt() / 0xFFFFFFFF;
//     }
// }

// // Usage
// const safeRng = new ChaChaRNG();
// setInterval(() => {
//     console.log(Math.floor(new ChaChaRNG().random() * 6 + 1));
// }, 1000);

const arr = [1, 2, 3, 4, 5, 6];

const time = crypto.randomInt(40, 91);
const id = setInterval(() => {
    const num = crypto.randomInt(10, 100);
    let r = (num % 10) % 6;
    let l = Math.floor(num / 10) % 6;
    let temp = arr[r];
    arr[r] = arr[l];
    arr[l] = temp;
    // let flag = true;
    // for (let i = 0; i < 5; i++) {
    //     if (arr[i] != arr[i + 1]) {
    //         flag = false;
    //         break
    //     }
    // }
    // if (flag) {
    //     clearInterval(id);
    //     console.log(arr);
    //     console.log("From condition")
    // }
    // console.log(arr);
}, 100);

setTimeout(() => {
    clearInterval(id);
    console.log(arr);
}, time * 100);