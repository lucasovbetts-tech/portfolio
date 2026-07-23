const input = document.getElementById(`guess-input`);
const submitBtn = document.getElementById(`guess-btn`);
const instr = document.getElementById(`instructions`);
const result = document.getElementById(`result`);
const resetBtn = document.getElementById(`reset-btn`);
const buttons = document.querySelectorAll('.diff-btn');
let maxNum;
let minNum = 1;
let count = 0;
let randomNum;
let gameStarted = false;


// setting difficulty

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!gameStarted) {
            const difficulty = button.dataset.diff;

            if (difficulty === "easy") {
                instr.textContent = "Pick a number between 1 and 100";
                maxNum = 100;
            } else if (difficulty === "hard") {
                instr.textContent = "Pick a number between 1 and 500";
                maxNum = 500;
            } else if (difficulty === "impossible") {
                instr.textContent = "Pick a number between 1 and 1,000,000";
                maxNum = 1000000;
            }

            randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
            count = 0;
            result.textContent = "";
            input.value = "";
            gameStarted = true;
        }
    });
});

submitBtn.onclick = function() {
    let value = Number(input.value);

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
    instr.textContent = "Choose a difficulty to start"
}
