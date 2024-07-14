const db = require('../../data/db-config');

const getAll = () => {
  return db('cars')
    .orderBy('id');
}

const getById = id => {
  return db('cars')
  .where({ id })
  .first();
}

const getByVin = vin => {
  return db('cars')
    .where({ vin })
    .first();
}

const create = car => {
  return db('cars')
  .insert(car);
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create
}