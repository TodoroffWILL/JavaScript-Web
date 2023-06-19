exports.getDifficultyOptionsViewData = function (platforms) {
  // Change the titles if u have enum
  // refactored for the title without index
  const titles = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

  const options = titles.map((title, index) => ({
    title: title,
    value: title,
    selected: platforms === title,
  }));

  return options;
};
