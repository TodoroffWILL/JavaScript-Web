const router = require('express').Router();
const animalManager = require('../manager/animalManager');

const { getErrorMessage, validateData } = require('../utils/errorHelpers');
const { isAuthz } = require('../middleware/authMiddleware');

router.get('/details/:id', async (req, res) => {
  const animalId = req.params.id;
  const userId = req.user?._id;

  try {
    const animal = await animalManager.getById(animalId).lean();
    const animalNotLeaned = await animalManager.getById(animalId);

    const isOwner = userId == animal.owner._id;

    res.locals.isDonated = false;
    if (animalNotLeaned.donations.includes(req.user?._id)) {
      res.locals.isDonated = true;
    }

    res.render('details', { animal, isOwner });
  } catch (err) {
    console.error(err.message);
    res.redirect(`/details/${animalId}`);
  }
});

router
  .route('/details/:id/edit')
  .get(isAuthz, async (req, res) => {
    const animalId = req.params.id;

    try {
      const animal = await animalManager.getById(animalId).lean();
      res.render('edit', { animal });
    } catch (err) {
      res.render('edit', { error: getErrorMessage(err) });
    }
  })
  .post(isAuthz, async (req, res) => {
    const animalId = req.params.id;
    const animalData = req.body;

    // Check if any field is empty or does not meet the minimum requirements

    try {
      const errors = validateData(animalData);
      if (errors.length > 0) {
        throw new Error(errors);
      }
      await animalManager.update(animalId, animalData);
      res.redirect(`/details/${animalId}`);
    } catch (err) {
      res.render('edit', { error: getErrorMessage(err) });
    }
  });

router.get('/details/:id/delete', isAuthz, async (req, res) => {
  const animalId = req.params.id;

  try {
    await animalManager.delete(animalId);
    res.redirect('/catalog');
  } catch (err) {
    res.render('details', { error: getErrorMessage(err) });
  }
});

router.get('/details/:id/donation', isAuthz, async (req, res) => {
  const animalId = req.params.id;
  const userId = req.user._id;
  try {
    const animal = await animalManager.getById(animalId);
    animal.donations.push(userId);
    animal.save();
    res.redirect(`/details/${animalId}`);
  } catch (err) {
    res.render(`details`, { error: getErrorMessage(err) });
  }
});

module.exports = router;
