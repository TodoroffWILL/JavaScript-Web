const Furniture = require('../models/Furniture');

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.getAll = async (querystring) => {
  let query = Furniture.find();

  const where = querystring.where;
  if (where) {
    let [fieldName, ownerId] = where.split('=');
    ownerId = ownerId.replaceAll('"', '');
    query = query.find({ _ownerId: ownerId });
  }
  const result = await query;

  return result;
};

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.update = (furnitureId, furnitureData) =>
  Furniture.findByIdAndUpdate(furnitureId, furnitureData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);
