const diceGame = {
    dice1: "./diceImages/one.png",
    dice2: "./diceImages/two.png",
    dice3: "./diceImages/three.png",
    dice4: "./diceImages/four.png",
    dice5: "./diceImages/five.png",
    dice6: "./diceImages/six.png",

    rollDice(isPlayer1or2) {
        let randNumber;
        let diceImageVar = document.getElementsByClassName("diceImage")[0];

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

let duplicateGame = document.getElementsByClassName("gameContainer")[0].cloneNode(true);
document.body.appendChild(duplicateGame);

let playerScore2 = 0;
let diceRoll2 = 0;
document.getElementsByClassName("diceRollButton")[1].addEventListener("click", (event) => {
    document.getElementsByClassName("resultText")[1].style.visibility = "hidden";
    document.getElementsByClassName("diceImage")[1].style.opacity = 1;
    diceRoll2 = diceGame.rollDice(1);
    playerScore2 += diceRoll2;
    document.getElementsByClassName("scoreText")[1].textContent = `Score : ${playerScore2}`;
    
    //A score of 20 means the player wins
    if (playerScore2 > 20) {
        document.getElementsByClassName("resultText")[1].textContent = "You Win";
        document.getElementsByClassName("resultText")[1].style.visibility = "visible";
        playerScore2 = 0;
    }

    //A roll of one means the game is over and resets
    if (diceRoll2 === 1) {
        document.getElementsByClassName("resultText")[1].textContent = "You Lose";
        document.getElementsByClassName("resultText")[1].style.visibility = "visible";
        playerScore2 = 0;
    }
});
// console.log(document.getElementsByClassName("gameContainer")[1]);
// console.log(document.getElementsByClassName("gameContainer")[0]);
// console.log(document.querySelectorAll("diceRollButton"));
// console.log(document.querySelectorAll("resultText"));

// duplicateGame.addEventListener("click", (event) => {
//     console.log(document.querySelectorAll("diceRollButton"));
//     // console.log(document.querySelector("body button"));
//     // console.log(document.querySelectorAll("resultText"));
//     // console.log(document.querySelectorAll("div"));
//     // console.log(duplicateGame);
    

//     console.log("test");
// });

// console.log(document.getElementsByClassName("diceRollButton")[0]);
// document.getElementsByClassName("diceRollButton")[0].style.visibility = "hidden";


let playerScore = 0;
let diceRoll = 0;
document.getElementsByClassName("diceRollButton")[0].addEventListener("click", (event) => {
    document.getElementsByClassName("resultText")[0].style.visibility = "hidden";
    document.getElementsByClassName("diceImage")[0].style.opacity = 1;
    diceRoll = diceGame.rollDice(0);
    playerScore += diceRoll;
    document.getElementsByClassName("scoreText")[0].textContent = `Score : ${playerScore}`;
    
    //A score of 20 means the player wins
    if (playerScore > 20) {
        document.getElementsByClassName("resultText")[0].textContent = "You Win";
        document.getElementsByClassName("resultText")[0].style.visibility = "visible";
        playerScore = 0;
    }

    //A roll of one means the game is over and resets
    if (diceRoll === 1) {
        document.getElementsByClassName("resultText")[0].textContent = "You Lose";
        document.getElementsByClassName("resultText")[0].style.visibility = "visible";
        playerScore = 0;
    }
});


