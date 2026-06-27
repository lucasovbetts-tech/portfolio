const diceInput = document.getElementById(`numberOfDice`);
const diceBtn = document.getElementById(`rollBtn`);
const result = document.getElementById(`diceRolled`);
let diceImages = document.getElementById(`diceImages`);

diceBtn.onclick = function() {
    let total = 0;
    let html = "";

    for (let i = 0; i < (diceInput.value); i++) {
        let diceRoll = Math.floor(Math.random() * 6) + 1;
        html += `<img src="../images/dice${diceRoll}.png">`;
        total += diceRoll;
    } 
    diceImages.innerHTML = html;
    result.textContent = "The total is: " + total;
}