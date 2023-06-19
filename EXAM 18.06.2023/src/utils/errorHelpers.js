const { MongooseError } = require('mongoose');

exports.getErrorMessage = (err) => {
  if (err instanceof MongooseError) {
    return Object.values(err.errors).at(0).message;
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return err.message;
  }
};

exports.validateData = (animalData) => {
  const { name, kind, imageUrl, years, needs, description, location } =
    animalData;
  const errors = [];

  if (!name || name.length < 2) {
    errors.push('The name is required and should be at least 2 characters');
  }

  if (!kind || kind.length < 3) {
    errors.push('The kind is required and should be at least 3 characters');
  }

  if (
    !imageUrl ||
    (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://'))
  ) {
    errors.push(
      'The photo image is required and should start with http:// or https://'
    );
  }

  if (!years || isNaN(years) || years < 1 || years > 100) {
    errors.push(
      'The years are required and should be a number between 1 and 100'
    );
  }

  if (!needs || needs.length < 3 || needs.length > 20) {
    errors.push(
      'The need is required and should be at least 3 and no longer than 20 characters'
    );
  }

  if (!description || description.length < 5 || description.length > 50) {
    errors.push(
      'The description is required and should be at least 5 and no longer than 50 characters'
    );
  }

  if (!location || location.length < 5 || location.length > 15) {
    errors.push(
      'The location is required and should be at least 5 and no longer than 15 characters'
    );
  }

  return errors;
};
