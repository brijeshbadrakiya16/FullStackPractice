// Day-46
// Day-47
// Day-48
// Day-49

// Snack & Ladder, Multiplayer, 2 Player, 3 Player, 4 Player, Color option

// total timer, turn timer, matchmaking time

// Win, Leave, coins, loss,

// To do:
 
// check for json getting how to do get that as error on /socket/game.js/46 -> roomData is null; --completed
// reconnection logic --completed

// to do: thursday
// reconnection event firing --completed
// redis connection timeout --due --will do in future learning
// game logics -- completed
// gameEnd logic on add remaining player array to ensure when on all player exit after of each's three round completed then game will End on remainingPlayer.length == 0 and all of the player have 0 OfflineChance  -- completed

// whenever remaining players .length == 1 then it is said as only one player have offlinechance's more then 0 or is online to play so hit the win and end game logic


// -- dicovers
// the setted socket.data will not be abled to access by io.in('someRoom').fetchSockets() and then for(socket of sockets);

// ######## TESTED

// reconnection , playernot found working fine
// player join working fine
// playing game is fine and special timeout works
// completed full end to end game play test from joining to winning;

// ______________________________________________________

// Day-46
// Date: 04/05/2026
// Task: Completed the task given by Jemish sir as created a socketio eventdriven game on backend and with minimal frontend also, which able to handle multiplayers and worked effectively on win and draw scenarios with also managing user session to maintain and reback user on the game which was he in when after diconnect or page refresh. Did multiple games entered to Yudiz portfolio as Hiten sir asked. Started building on new task of Snake&Ladder Game as given by Jemish Sir.

// ______________________________________________________

// Day-47
// Date: 05/05/2026
// Task: Started working on Snack & Ladder game as successfully created register and login api endpoints and also create working auth middleware on socket before allowing player to hit gameplay, established successfull connection and partial match making.

// ______________________________________________________

// Day-48
// Date: 06/05/2026
// Task: Slightly improved match making and event firing on that, builded reconnection to same room logic and builded game play logic with all checks random dice number and all the gameplay logics and tested the gamejoining and little bit gameplay as it works as intendent.

// ______________________________________________________

// Day-49
// Date: 07/05/2026
// Task: Solved bugs in joining room and reconnection to same room and improved it also, enhaced the storing data of a room in redis for more control over different case scenarios like winning, playing, remainingPlayerData, rollsOfSix, and important one offlineChance, also solved all bugs of the gamePlay event and builded winGame and endGame logic, solved bugs in turnTimeout also, as i did full test from connection to player not found to game joined to next turn to winGame and endGame successfully.
// Completed the Snack & Ladders Backend Task as per given by Jemish Sir.

// ______________________________________________________

// search questions

// if i want to prevent user from inputing data to field by mongoose schema then how can i do that
// No satifying answer to changes logic

// hey if i am building multiplayer game with authentication workflow in express using socketio, then where my game connection will established like on certain api end point or from anywhere player hits my any api or from login
// No any accurate satisfying answer

// i am confuse on how can i import and initialize io
// Same as above, implemented in own way

// do it should compulsory be stateful without any api hit point like see what i am thinking is when user hit /join then connect it when hits /play then play that connect but this can not be doable or what, should i only do event driven instead of api driven for the game
// answer satisfies as if i hit the api every time then server might have someissues in realtime game play so every time handshake will send and every time headers send so response time will be so down so just needed to use stateful event driven architecture for the game

// ok i understand now but i am not able to define where i have to do connection and how can i test it with postman
// now i slowly undestand how code flows

// like see my server listening on /auth/register or /auth/login for authentication and after login it will set token in cookie on res side and i declared my io in game router with io = new Server(app(imported from  main app.js )) and did io.of("/game/join").on("connection",callback), so how can i test this, or should i have to change anything



// ________________________

// day48
// doing reconnection
// Game play logic

// ________________________

// day49

// doing event emitting from reconnection
