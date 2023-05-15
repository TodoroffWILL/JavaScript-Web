const sum = (a, b) => a + b;

const multiply = function (a, b) {
  return a * b;
};

function substract(a, b) {
  return a - b;
}

// default CommonJS export
const calculator = {
  sum,
  multiply,
  substract,
};
module.exports = calculator
