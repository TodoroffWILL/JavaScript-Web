exports.getDifficultyOptionsViewData = function (platforms) {
  const titles = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

  const options = titles.map((title, index) => ({
    title: title,
    value: title,
    selected: platforms === title,
  }));

  return { options: options };
};

// refactored for the title without index
