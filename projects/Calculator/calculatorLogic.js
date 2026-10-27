const display = document.getElementById("calcScreen");

let exponentMode = false;
let internal = "";

// display superscripts
const map = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹"
};

// reverse map: superscript to regular digit
const reverseMap = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"
};

const operationMap = {
  "x": "*"
};

function toggleExponent() {
  exponentMode = !exponentMode;

if (exponentMode) {
    exponentOn.classList.add("exponentOn");
} else {
    exponentOn.classList.remove("exponentOn");
}

  if (exponentMode) internal += "**";
}

function appendToDisplay(input) {
  const op = operationMap[input] || input;

  display.value += exponentMode
    ? (map[input] || input)
    : input;

  internal += exponentMode
    ? input
    : op;
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  internal = internal.slice(0, -1);
}

function clearScreen() {
  display.value = "";
  internal = "";
}

function convertToCalculable(expr) {
  let result = "";
  for (let char of expr) {
    result += reverseMap[char] || char;
  }
  return result;
}

function calculate() {
  const calcExpr = convertToCalculable(internal);
  display.value = eval(calcExpr);
  internal = display.value.toString();
}