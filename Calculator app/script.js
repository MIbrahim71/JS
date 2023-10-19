use = "strict";

const displayInput = document.getElementById("inputValue");

const operators = ["-", "+", "%", "*", "/"];
let operations = [];
let currValue = "";

// FUNCTIONS & OPERATIONS

// MAIN Interaction function
const handleInteraction = (val) => {
  if (operators.includes(val)) {
    console.log("Clicked operator: ", val);
    handleOperatorInput(val);
  } else {
    console.log("Clicked numeric: ", val);
    handleNumericInput(val);
  }
  updateUI();
};

// Click Number
const handleNumericInput = (val) => {
  if (val === "." && currValue.includes(".")) return;
  currValue += val;
};

// Click Operator
const handleOperatorInput = (val) => {
  // Guard clause making sure operator isn't first click
  if (!currValue) {
    return;
  }

  operations.push(currValue);
  operations.push(val);
  currValue = "";
};

// Click =
const handleEvaluate = () => {
  // If there is no input, just return
  if (operations.length === 0) {
    return;
  }
  let finalAmount = operations[0];
  let prevOperator = null;
  // If last input is an operator, remove from operations to get previous num
  if (!currValue) {
    operations.pop();
  } else {
    operations.push(currValue);
    currValue = "";
  }
  // Loop through operations, see if i is number/operator,
  for (let i = 1; i < operations.length; i++) {
    if (i % 2 === 0) {
      // IF numeric value
      finalAmount = eval(`${finalAmount} ${prevOperator} ${operations[i]}`);
    } else {
      // IF operator value
      prevOperator = operations[i];
    }
  }
  operations = [];
  currValue = finalAmount.toFixed(2);
  updateUI();
};

// Click AC
const handleReset = () => {
  currValue = "";
  operations = [];
  updateUI();
};

// Update UI
const updateUI = () => {
  const displayString = operations.join(" ") + currValue;
  displayInput.innerText = displayString.trim() ? displayString : "0";
};
