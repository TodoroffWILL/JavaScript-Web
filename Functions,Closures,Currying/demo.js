// function declaration is that we decalre a function like this
function plus(a, b) {
  return a + b;
}

// Function Expresion can be stored in a variable
// Annoynmous func doesn't have name
const minus = function (num) {
  return num - num;
};
console.log(minus(5));

// First Class function - function that accepts another function as parameter

function square(num) {
  return num * num;
}
function displaySquare(fn) {
  console.log(`Square is ${fn(5)}`);
}
displaySquare(square);

// IFFE - Immediately invoked function expresion
(function (x) {
  return (function (y) {
    console.log(x); // 1
  })(2);
})(1);

