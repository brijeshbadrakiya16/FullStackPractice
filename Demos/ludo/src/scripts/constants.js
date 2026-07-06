export const colors = ['red', 'green', 'yellow', 'blue'];
export const getColorByIndex = (i) => colors[i % 4];

export const boardScale = 1.09;

// For home condition check at run time on seprate gome arrays adjust pawn based on the numbers present and for all maintain this array as soon as if any pawn enters in it pass the reference of that pawn to the array
export const boardPawnPos = [
    { pos: 0, x: 475, y: 1465 },
    { pos: 1, x: 475, y: 1392, home: true },
    { pos: 2, x: 475, y: 1318 },
    { pos: 3, x: 475, y: 1245 },
    { pos: 4, x: 475, y: 1171 },
    { pos: 5, x: 475, y: 1098 },
    { pos: 6, x: 404, y: 1025 },
    { pos: 7, x: 328, y: 1025 },
    { pos: 8, x: 254, y: 1025 },
    { pos: 9, x: 180, y: 1025, home: true },
    { pos: 10, x: 108, y: 1025 },
    { pos: 11, x: 34, y: 1025 },
    { pos: 12, x: 34, y: 960 },
    { pos: 13, x: 34, y: 894 },
    { pos: 14, x: 108, y: 894 },
    { pos: 15, x: 180, y: 894 },
    { pos: 16, x: 254, y: 894 },
    { pos: 17, x: 328, y: 894 },
    { pos: 18, x: 404, y: 894 },
    { pos: 19, x: 475, y: 824 },
    { pos: 20, x: 475, y: 749 },
    { pos: 21, x: 475, y: 674 },
    { pos: 22, x: 475, y: 602, home: true },
    { pos: 23, x: 475, y: 529 },
    { pos: 24, x: 475, y: 453 },
    { pos: 25, x: 540, y: 453 },
    { pos: 26, x: 606, y: 453 },
    { pos: 27, x: 606, y: 529, home: true },
    { pos: 28, x: 606, y: 602 },
    { pos: 29, x: 606, y: 674 },
    { pos: 30, x: 606, y: 749 },
    { pos: 31, x: 606, y: 824 },
    { pos: 32, x: 678, y: 894 },
    { pos: 33, x: 751, y: 894 },
    { pos: 34, x: 825, y: 894 },
    { pos: 35, x: 902, y: 894, home: true },
    { pos: 36, x: 972, y: 894 },
    { pos: 37, x: 1045, y: 894 },
    { pos: 38, x: 1045, y: 960 },
    { pos: 39, x: 1045, y: 1025 },
    { pos: 40, x: 972, y: 1025, home: true },
    { pos: 41, x: 902, y: 1025 },
    { pos: 42, x: 825, y: 1025 },
    { pos: 43, x: 751, y: 1025 },
    { pos: 44, x: 678, y: 1025 },
    { pos: 45, x: 606, y: 1098 },
    { pos: 46, x: 606, y: 1171 },
    { pos: 47, x: 606, y: 1245 },
    { pos: 48, x: 606, y: 1318, home: true },
    { pos: 49, x: 606, y: 1392 },
    { pos: 50, x: 606, y: 1465 },
    { pos: 51, x: 540, y: 1465 },
]

export const modeTwo_1_Color = 'red';
export const modeTwo_1_Entry = 51;
export const modeTwo_1_Start = 1;
export const modeTwo_1_Goto = 52;
export const modeTwo_1_HomePositions = [
    { x: 288, y: 1320 },
    { x: 288, y: 1199 },
    { x: 150, y: 1320 },
    { x: 150, y: 1199 }
]

// ? Color option will not be needed in four but in two if the two player wants to play on colour option then will give in future
// export const modeTwo_2_Color = (color) => colors.at((colors.indexOf(color) + 2) % 4); 
export const modeTwo_2_Color = 'yellow';
export const modeTwo_2_Entry = 25;
export const modeTwo_2_Start = 27;
export const modeTwo_2_Goto = 62;
export const modeTwo_2_HomePositions = [
    { x: 792, y: 560 },
    { x: 792, y: 681 },
    { x: 931, y: 681 },
    { x: 931, y: 560 },
]

export const modeFour_1 = {
    entry: 51,
    start: 1,
    goto: 52,
    color: 'red',
    playerNumber: 1,
    homePositions: [
        { x: 288, y: 1320 },
        { x: 288, y: 1199 },
        { x: 150, y: 1320 },
        { x: 150, y: 1199 },
    ]
}

export const modeFour_2 = {
    entry: 12,
    start: 14,
    goto: 58,
    color: 'green',
    playerNumber: 2,
    homePositions: [
        { x: 150, y: 681 },
        { x: 288, y: 681 },
        { x: 288, y: 560 },
        { x: 150, y: 560 },
    ]
}

export const modeFour_3 = {
    entry: 25,
    start: 27,
    goto: 64,
    color: 'yellow',
    playerNumber: 3,
    homePositions: [
        { x: 792, y: 560 },
        { x: 792, y: 681 },
        { x: 931, y: 681 },
        { x: 931, y: 560 },
    ]
}

export const modeFour_4 = {
    entry: 38,
    start: 40,
    goto: 70,
    color: 'blue',
    playerNumber: 4,
    homePositions: [
        { x: 931, y: 1199 },
        { x: 792, y: 1199 },
        { x: 792, y: 1320 },
        { x: 931, y: 1320 },
    ]
}

export const diceButtonPositions = [
    { containerX: 80, containerY: 1580, color: "#fc7070" },
    { containerX: 80, containerY: 250, color: "lightgreen" },
    { containerX: 820, containerY: 250, color: "yellow" },
    { containerX: 820, containerY: 1580, color: "lightblue" },
]