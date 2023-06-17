const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getById = (id) => Game.findById(id);
exports.getByIdBuy = (id) => Game.findById(id).populate('boughtBuy');

exports.update = (id, gameData) => Game.findByIdAndUpdate(id, gameData);

exports.delete = (id) => Game.findByIdAndDelete(id);

exports.getGameBySearch = async (search, searchPlatform) => {
  const foundGames = await Game.find({
    name: { $regex: new RegExp(search, 'i') },
    platform: { $regex: new RegExp(searchPlatform, 'i') },
  }).lean();

  return foundGames;
};
