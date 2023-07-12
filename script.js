const diceGame = {
    dice1: "./diceImages/one.png",
    dice2: "./diceImages/two.png",
    dice3: "./diceImages/three.png",
    dice4: "./diceImages/four.png",
    dice5: "./diceImages/five.png",
    dice6: "./diceImages/six.png",

    rollDice() {
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {

                
            console.log("test");
        },1000)
        }

        let randNumber;
        let diceImageVar = document.getElementById("diceImage");
        randNumber = Math.ceil(Math.random() * 6);
        switch (randNumber) {
            case 1:
                diceImageVar.src = this.dice1;
                break;
            case 2:
                diceImageVar.src = this.dice2;
                break;
            case 3:
                diceImageVar.src = this.dice3;
                break;
            case 4:
                diceImageVar.src = this.dice4;
                break;
            case 5:
                diceImageVar.src = this.dice5;
                break;
            case 6:
                diceImageVar.src = this.dice6;
                break;
            }
    },
    
    // runDiceAnimation(howManyTimesRollDice) {
    //     for (let i = 0; i < howManyTimesRollDice; i++) {
    //         setTimeout(this.rollDice, 1000);
    //     }

    // }
}

// diceGame.runDiceAnimation(3);
diceGame.rollDice();