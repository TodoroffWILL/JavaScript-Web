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
