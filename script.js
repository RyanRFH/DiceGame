const diceGame = {
    dice1: "./diceImages/one.png",
    dice2: "./diceImages/two.png",
    dice3: "./diceImages/three.png",
    dice4: "./diceImages/four.png",
    dice5: "./diceImages/five.png",
    dice6: "./diceImages/six.png",

    rollDice() {
        let randNumber;
        let diceImageVar = document.getElementById("diceImage");

        randNumber = Math.ceil(Math.random() * 6);
        switch (randNumber) {
            case 1:
                diceImageVar.src = this.dice1;
                return 1;
            case 2:
                diceImageVar.src = this.dice2;
                return 2;
            case 3:
                diceImageVar.src = this.dice3;
                return 3;
            case 4:
                diceImageVar.src = this.dice4;
                return 4;
            case 5:
                diceImageVar.src = this.dice5;
                return 5;
            case 6:
                diceImageVar.src = this.dice6;
                return 6;
            default:
                console.log("Error: Dice not found");
        }
    },
}
let playerScore = 0;
let diceRoll = 0;
document.getElementById("diceRollButton").addEventListener("click", (event) => {
    document.getElementById("resultText").style.visibility = "hidden";
    document.getElementById("diceImage").style.opacity = 1;
    diceRoll = diceGame.rollDice();
    playerScore += diceRoll;
    document.getElementById("scoreText").textContent = `Score : ${playerScore}`;
    
    //A score of 20 means the player wins
    if (playerScore > 20) {
        document.getElementById("resultText").textContent = "You Win";
        document.getElementById("resultText").style.visibility = "visible";
        playerScore = 0;
    }

    //A roll of one means the game is over and resets
    if (diceRoll === 1) {
        document.getElementById("resultText").textContent = "You Lose";
        document.getElementById("resultText").style.visibility = "visible";
        playerScore = 0;
    }
});


