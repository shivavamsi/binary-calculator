// Calculator Controller (Model)
var calcController = (function() {

  // performs addition
  var add = function(operandOne, operandTwo) {
    return operandOne + operandTwo;
  };

  // performs subtraction
  var subtract = function(operandOne, operandTwo) {
    return operandOne - operandTwo;
  };

  // performs multiplication
  var multiply = function(operandOne, operandTwo) {
    return operandOne * operandTwo;
  };

  // performs division
  var divide = function(operandOne, operandTwo) {
    return operandOne / operandTwo;
  };

  return {

    // performs calculation
    calculate: function(operandOne, operandTwo, operator) {
      var result;     // variable to store result

      switch (operator) {
        case "+":
          result = add(operandOne, operandTwo);
          break;

        case "-":
          result = subtract(operandOne, operandTwo);
          break;

        case "*":
          result = multiply(operandOne, operandTwo);
          break;

        case "/":
          result = divide(operandOne, operandTwo);
          break;
      }

      return result;
    }
  };

})();

// UI Controller (View)
var uiController = (function() {

  // list of DOM elements used
  var DOMstrings = {
    displayBoard: "res",
    buttonZero: "btn0",
    buttonOne: "btn1",
    buttonClear: "btnClr",
    buttonEqual: "btnEql",
    buttonAdd: "btnSum",
    buttonSubtract: "btnSub",
    buttonMultiply: "btnMul",
    buddonDivide: "btnDiv"
  };

  return {

    // gets input from the displayBoard
    getInput: function() {
      var disp = document.getElementById(DOMstrings.displayBoard);
      var input = disp.innerHTML;
      return input;
    },

    // returns the list of DOM elements utilized
    getDOMstrings: function() {
      return DOMstrings;
    },

    // displays results on the displayBoard
    display: function(result) {
      var disp = document.getElementById(DOMstrings.displayBoard);
      disp.innerHTML = result;
    }
  };

})();

// Global App Controller (Controller)
var controller = (function(calcCtrl, uiCtrl) {

  var operandOne;         // stores the first Operand
  var operandTwo;         // stores the second Operand
  var operator = null;    // stores the current operator

  var setupEventListeners = function() {
    var DOM = uiCtrl.getDOMstrings();       // get all DOM elements from uiController

    // Event Listeners for button click
    document.getElementById(DOM.buttonZero).addEventListener("click", function() {displayInput("0");});
    document.getElementById(DOM.buttonOne).addEventListener("click", function() {displayInput("1");});
    document.getElementById(DOM.buttonClear).addEventListener("click", clearDisplay);
    document.getElementById(DOM.buttonEqual).addEventListener("click", getResult);
    document.getElementById(DOM.buttonAdd).addEventListener("click", addOperation);
    document.getElementById(DOM.buttonSubtract).addEventListener("click", subtractOperation);
    document.getElementById(DOM.buttonMultiply).addEventListener("click", multiplyOperation);
    document.getElementById(DOM.buddonDivide).addEventListener("click", divideOperation);
  };

  // clears the display on calculator
  var clearDisplay = function() {
    uiCtrl.display("0");
  };

  // displays the new input on the displayBoard
  var displayInput = function(digit) {
    // get the value already displayed
    var currentDisplay = uiCtrl.getInput();
    // concatinate the new digit to the existing value
    var newDisplay = currentDisplay !== "0" ? (currentDisplay + digit) : digit;
    // display the new value on the displayBoard
    uiCtrl.display(newDisplay);
  };

  // converts a binary number in string format to a decimal number
  var binaryStringToDecimal = function(binaryString) {
    var decimalInteger = parseInt(binaryString, 2);
    return decimalInteger;
  };

  // converts a decimal number to binary number in String format
  var decimalToBinary = function (decimalInteger) {
    var binaryString = decimalInteger.toString(2);
    return binaryString;
  };

  // sets the operator for the current operation
  var setOperator = function(symbol) {
    operator = symbol;
    displayInput(operator);
  }

  // performs the addition operation
  var addOperation = function() {
    if (operator === null) {
      // set the operator if it is not present already
      setOperator("+");
    } else {
      // get the result if operator is already set
      getResult();
      // set the operator on the new result
      setOperator("+");
    }
  };

  // performs the addition operation
  var subtractOperation = function() {
    if (operator === null) {
      // set the operator if it is nor present already
      setOperator("-");
    } else {
      // get the result if operator is already set
      getResult();
      // set the operator on the new result
      setOperator("-");
    }
  };

  // performs the addition operation
  var multiplyOperation = function() {
    if (operator === null) {
      // set the operator if it is nor present already
      setOperator("*");
    } else {
      // get the result if operator is already set
      getResult();
      // set the operator on the new result
      setOperator("*");
    }
  };

  // performs the addition operation
  var divideOperation = function() {
    if (operator === null) {
      // set the operator if it is nor present already
      setOperator("/");
    } else {
      // get the result if operator is already set
      getResult();
      // set the operator on the new result
      setOperator("/");
    }
  };

  // performs the calculation
  var getResult = function() {
    if (operator !== null) {
      // perform the calculation if operand is not null
      var input = uiCtrl.getInput();
      // split the input to get the first and second operands
      var temp = input.split(operator);
      // convert the operands into decimal format
      operandOne = binaryStringToDecimal(temp[0]);
      operandTwo = binaryStringToDecimal(temp[1]);
      // get the result
      var result = calcCtrl.calculate(operandOne, operandTwo, operator);
      // display the result
      uiCtrl.display(decimalToBinary(result));
      // reset operator to null
      operator = null;
    }
  };

  return {
    // initialize the calculator
    init: function() {
      clearDisplay();
      setupEventListeners();
    }
  };

})(calcController, uiController);

controller.init();    // invoke the init() function on page load
