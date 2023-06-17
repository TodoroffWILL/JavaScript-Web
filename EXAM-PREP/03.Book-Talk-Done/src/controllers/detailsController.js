const router = require('express').Router();
const bookManager = require('../manager/bookManager');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router.get('/details/:id', async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user?._id;

  try {
    const book = await bookManager.getById(bookId).lean();
    const bookNotLeaned = await bookManager.getById(bookId);

    const isOwner = userId == book.owner._id;

    res.locals.isWished = false;
    if (bookNotLeaned.wishList.includes(req.user?._id)) {
      res.locals.isWished = true;
    }

    res.render('details', { book, isOwner });
  } catch (err) {
    res.redirect(`/details/${bookId}`);
  }
});

router
  .route('/details/:id/edit')
  .get(isAuthz, async (req, res) => {
    const bookId = req.params.id;

    try {
      const book = await bookManager.getById(bookId).lean();
      res.render('edit', { book });
    } catch (err) {
      res.render('edit', { error: getErrorMessage(err) });
    }
  })
  .post(isAuthz, async (req, res) => {
    const bookId = req.params.id;
    const bookData = req.body;

    // Check if any field is empty or does not meet the minimum requirements

    try {
      const errors = validateData(bookData);
      if (errors.length > 0) {
        throw new Error(errors);
      }
      await bookManager.update(bookId, bookData);
      res.redirect(`/details/${bookId}`);
    } catch (err) {
      res.render('edit', { error: getErrorMessage(err) });
    }
  });

router.get('/details/:id/delete', async (req, res) => {
  const bookId = req.params.id;

  try {
    await bookManager.delete(bookId);
    res.redirect('/catalog');
  } catch (err) {
    res.render('details', { error: getErrorMessage(err) });
  }
});

router.get('/details/:id/wish', async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user._id;
  try {
    const book = await cryptoManager.getById(bookId);
    book.wishList.push(userId);
    book.save();
    res.redirect(`/details/${bookId}`);
  } catch (err) {
    res.render(`details`, { error: getErrorMessage(err) });
  }
});

module.exports = router;
function validateData(bodyData) {
  // Change if needed !!!
  const { title, author, imageUrl, review, genre, stars } = bodyData;
  const errors = [];

  if (!title || title.length < 2) {
    errors.push('Title should be at least 2 characters');
  }

  if (!author || author.length < 5) {
    errors.push('Author should be at least 5 characters');
  }

  if (!genre || genre.length < 3) {
    errors.push('Genre should be at least 3 characters');
  }

  if (!stars || isNaN(stars) || stars < 1 || stars > 5) {
    errors.push('Stars value must be between 1 and 5');
  }

  if (
    !imageUrl ||
    !imageUrl.startsWith('http://') ||
    !imageUrl.startsWith('https://')
  ) {
    errors.push('Image URL must start with http:// or https://');
  }

  if (!review || review.length < 10) {
    errors.push('Review should be a minimum of 10 characters long');
  }

  return errors;
}
