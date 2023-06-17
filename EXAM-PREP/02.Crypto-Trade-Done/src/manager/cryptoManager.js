const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.getAll = () => Crypto.find();

exports.getById = (cryptoId) => Crypto.findById(cryptoId);

exports.update = (cryptoId, cryptoData) =>
  Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.getGameBySearch = async (search, searchPlatform) => {
  const foundGames = await Crypto.find({
    name: { $regex: new RegExp(search, 'i') },
    platform: { $regex: new RegExp(searchPlatform, 'i') },
  }).lean();

  return foundGames;
};
