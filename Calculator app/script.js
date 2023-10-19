use = "strict";

const displayInput = document.getElementById("inputValue");

const operators = ["-", "+", "%", "*", "/"];

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

//

const handleNumericInput = (val) => {};

//

const handleOperatorInput = (val) => {};

//

const handleEvaluate = () => {};

//

const handleReset = () => {};

//

const updateUI = () => {};
