const validator = require('validator');

exports.getDifficultyOptionsViewData = function (platforms) {
  const titles = ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'];

  const options = titles.map((title, index) => ({
    title: title,
    value: title,
    selected: platforms === title,
  }));

  return options;
};

// refactored for the title without index
exports.editValidatorHelper = (data) => {
  if (!validator.isLength(data.name, { min: 2 })) {
    throw new Error('Name should be at least two characters');
  }
  if (!validator.isFloat(String(data.price), { min: 0 })) {
    throw new Error('Price should be a positive number');
  }
  if (!validator.isURL(data.imageUrl, { require_protocol: true })) {
    throw new Error('Crypto Image should start with http:// or https://');
  }
  if (!validator.isLength(data.description, { min: 10 })) {
    throw new Error('Description should be a minimum of 10 characters long');
  }
};
