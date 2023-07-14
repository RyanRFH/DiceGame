//Handles dice functionality
const diceController = {
    //Image storage
    dice1: "./diceImages/one.png",
    dice2: "./diceImages/two.png",
    dice3: "./diceImages/three.png",
    dice4: "./diceImages/four.png",
    dice5: "./diceImages/five.png",
    dice6: "./diceImages/six.png",

    //Creates a random number between 1-6 and sets the dice image accordingly (takes the player number, returns number rolled)
    rollDice(isPlayer1or2) {
        let randNumber;

        randNumber = Math.ceil(Math.random() * 6);
        switch (randNumber) {
            case 1:
                document.getElementsByClassName("diceImage")[isPlayer1or2].src = this.dice1;
                return 1;
            case 2:
                document.getElementsByClassName("diceImage")[isPlayer1or2].src = this.dice2;
                return 2;
            case 3:
                document.getElementsByClassName("diceImage")[isPlayer1or2].src = this.dice3;
                return 3;
            case 4:
                document.getElementsByClassName("diceImage")[isPlayer1or2].src = this.dice4;
                return 4;
            case 5:
                document.getElementsByClassName("diceImage")[isPlayer1or2].src = this.dice5;
                return 5;
            case 6:
                document.getElementsByClassName("diceImage")[isPlayer1or2].src = this.dice6;
                return 6;
            default:
                console.log("Error: Dice not found");
        }
    },
}

//Handles creation of new game containers and the running of the game
const gameController = {
    //Stored whos turn it is
    playerTurn: 0,

    //Array of bools to determine if each player has had their turn or not
    playerCanRoll: [true],

    //Amount of extra players in the game
    numOfExtPlayers: 0,
    
    //Element storage
    resultText: document.getElementsByClassName("resultText"),
    diceImage: document.getElementsByClassName("diceImage"),
    playerName: document.getElementsByClassName("playerName"),
    diceRollButton: document.getElementsByClassName("diceRollButton"),
    holdScoreButton: document.getElementsByClassName("holdScoreButton"),
    currentScoreText: document.getElementsByClassName("currentScoreText"),
    totalScoreText: document.getElementsByClassName("totalScoreText"),

    //Applies button animation
    buttonAnimation(buttonElement) {     
        buttonElement.style.border = "5px inset";
        setTimeout(() => {
            buttonElement.style.border = "5px outset";
        }, 250)
    },

    //Handles the start menu
    startMenuController() {
        //Makes start menu hidden and game container visible
        document.getElementById("startGameContainer").addEventListener("click", () => {
            document.getElementById("startGameContainer").style.display = "none";
            document.getElementById("gameContainerContainer").style.display = "flex";
            document.getElementById("createNewGameButtonContainer").style.display = "flex";
        })
    },

    //Handles creation of new game containers
    createDuplicateGame(playerScoresArray) {

        //Applies button animation
        this.buttonAnimation(document.getElementById("createNewGameButton"));

        //Array of background colours
        let ranColours = ["blue", "green", "purple", "orange", "white", "yellow"]

        //Create a duplicate of game container
        let duplicateGame = document.getElementsByClassName("gameContainer")[0].cloneNode(true);

        //Changes the player name color to default black, it would be red normally as its copied
        duplicateGame.getElementsByClassName("playerName")[0].style.color = "black";

        //Gives the new game container a random background colour
        duplicateGame.style.backgroundColor = ranColours[Math.floor(Math.random() * ranColours.length)];

        //Appends duplicated game container to game container container
        document.getElementById("gameContainerContainer").appendChild(duplicateGame);

        //Adds the new players score to the players score array
        playerScoresArray.push(0);

        //Adds a player can role boolean to array
        this.playerCanRoll.push(true);

        //Increases number of extra players by 1
        this.numOfExtPlayers++;

        //Gives the game container the correct player name
        this.playerName[playerScoresArray.length - 1].textContent = `Player: ${playerScoresArray.length}`;
    },

    //Resets every player to default settings
    resetAllPlayersToDefault(playerScore, playerNumber) {
        for (let i = 0; i < this.numOfExtPlayers + 1; i ++) {
            this.playerCanRoll[i] = true;
            playerScore[i] = 0;

            //Updates all players current score display, except the player who won/lost
            if (playerNumber !== this.playerTurn) {
                this.currentScoreText[i].textContent = `Current Score : 0`;
            }

            this.totalScoreText[i].textContent = `Total Score : 0`;
            this.playerName[i].style.color = "black";
        }
        this.playerName[0].style.color = "red";
    },


    //Handles the gameplay
    runGame(playerScore, playerNumber) {
        let diceRoll = 0;
        
        //Creates click event listener
        this.diceRollButton[playerNumber].addEventListener("click", (event) => {

            //Checks if player can role and if its their turn to roll
            if (this.playerCanRoll[playerNumber] === true && this.playerTurn === playerNumber) {
                
                //Applies button animation
                this.buttonAnimation(this.diceRollButton[playerNumber]);

                //Hides result text for all players, shows dice image, calls for a dice roll, adds dice roll to player score, 
                //updates current score text
                for (let i = 0; i < this.numOfExtPlayers + 1; i ++) {
                    this.resultText[i].style.visibility = "hidden";
                }
                this.diceImage[playerNumber].style.opacity = 1;
                diceRoll = diceController.rollDice(playerNumber);
                playerScore[playerNumber] += diceRoll;
                for (let i = 0; i < amountOfExtraPlayers + 1; i++) {
                    this.currentScoreText[i].textContent = `Current Score : ${playerScore[i]}`;
                }
                
                //Controls game wins, checks if game is in single player or mutliplayer mode by checking amount of players
                if (amountOfExtraPlayers === 0) {
                    //In single player, a score of greater than 20 wins and the game resets
                    if (playerScore[playerNumber] > 20) {
                        //Displays you win message, calls function to reset all players scores to default
                        this.resultText[playerNumber].textContent = "You Win";
                        this.resultText[playerNumber].style.visibility = "visible";

                        this.resetAllPlayersToDefault(playerScore, playerNumber);

                        playerScore[playerNumber] = 0;
                        this.playerTurn = 0;
                        return;
                    }
                } else {
                    //In multiplayer, a score of 20 or more wins and the game resets
                    if (playerScore[playerNumber] >= 20) {
                        //Displays you win message, calls function to reset all players scores to default
                        this.resultText[playerNumber].textContent = "You Win";
                        this.resultText[playerNumber].style.visibility = "visible";

                        this.resetAllPlayersToDefault(playerScore, playerNumber);

                        playerScore[playerNumber] = 0;
                        this.playerTurn = 0;
                        return;
                    }
                }

                //A roll of one means the game is over and resets
                if (diceRoll === 1) {

                    //Displays you lose message, calls function to reset all players scores to default
                    this.resultText[playerNumber].textContent = "You Lose";
                    this.resultText[playerNumber].style.visibility = "visible";

                    this.resetAllPlayersToDefault(playerScore, playerNumber);

                    playerScore[playerNumber] = 0;
                    this.playerTurn = 0;
                    return;
                }
            }
        });

        //Hold button
        this.holdScoreButton[playerNumber].addEventListener("click", () => {

            //Checks if player has pressed hold button, if not then they can roll, and if its the right players turn, 
            //and makes sure there are more than 1 players in the game as hold button is not needed otherwise
            if (this.playerCanRoll[playerNumber] === true && this.playerTurn === playerNumber && this.numOfExtPlayers > 0) {
                
                //Applies button animation
                this.buttonAnimation(this.holdScoreButton[playerNumber]);

                //Changes colour of current players name to black and the next players name to red, and updates total score
                this.playerName[playerNumber].style.color = "black";
                if (playerNumber !== amountOfExtraPlayers) {
                    this.playerName[playerNumber + 1].style.color = "red";
                } else {
                    this.playerName[0].style.color = "red";
                }
                this.totalScoreText[playerNumber].textContent = `Total Score : ${playerScore[playerNumber]}`;
                
                this.playerCanRoll[playerNumber] = false;
                if (this.playerTurn === this.numOfExtPlayers) {
                    this.playerTurn = 0;

                    //Resets all players to be able to roll
                    for (let i = 0; i < this.playerCanRoll.length; i ++) {
                        this.playerCanRoll[i] = true;
                    }
                } else {
                    this.playerTurn++;
                }
            }
        })
    }
}

//Stores score of each player
let playersScores = [0];
//Tracks amount of extra players
let amountOfExtraPlayers = 0;

//Creates start menu
gameController.startMenuController();

//Creates initial 1 player game
gameController.runGame(playersScores, 0);

//Creates duplicate game instance and gives it game functionality when new game button is clicked
document.getElementById("createNewGameButton").addEventListener("click", () => {
    gameController.createDuplicateGame(playersScores);
    amountOfExtraPlayers++;
    gameController.runGame(playersScores, amountOfExtraPlayers);
});


