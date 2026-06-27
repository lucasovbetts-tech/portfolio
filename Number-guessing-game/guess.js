const input = document.getElementById(`guess-input`);
const submitBtn = document.getElementById(`guess-btn`);
const instr = document.getElementById(`instructions`);
const result = document.getElementById(`result`);
const resetBtn = document.getElementById(`reset-btn`);
let maxNum;
let minNum = 1;
let count = 0;
let randomNum;
let gameStarted = false;

submitBtn.onclick = function() {
    let value = Number(input.value);

// setting difficulty
    if (!gameStarted) {
        if (input.value === "1") {
            instr.textContent = "Pick a number between 1 and 100";
            maxNum = 100;
            randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
            count = 0;
            result.textContent = "";
            input.value = "";
            gameStarted = true;
            return;
        }
        else if (input.value === "2") {
            instr.textContent = "Pick a number between 1 and 500";
            maxNum = 500;
            randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
            count = 0;
            result.textContent = "";
            input.value = "";
            gameStarted = true;
            return;
        }
        else if (input.value === "3") {
            instr.textContent = "Pick a number between 1 and 1,000,000";
            maxNum = 1000000;
            randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
            count = 0;
            result.textContent = "";
            input.value = "";
            gameStarted = true;
            return;
        }
    }
// comparing the user input to the random number

     if (!value) return;

    count++;

    if (value === randomNum) {
        gameStarted = false;
        instr.textContent = "Pick a difficulty to play again.";
        if (count === 1){
            result.textContent = `Well done you guessed it in ${count} try!!!`;
        }else {
            result.textContent = `Well done you guessed it in ${count} tries.`;
        }
    } else if (value > randomNum) {
        result.textContent = "Lower!";
    } else {
        result.textContent = "Higher!";
    }

    input.value = "";
};

resetBtn.onclick = function() {
    gameStarted = false;
    instr.textContent = "Pick a difficulty | Easy (1) | Hard (2) | Impossible (3)"
}
