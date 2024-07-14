const router = require('express').Router();

const {
  getAll,
  getById,
  create
} = require('./cars-model');

const {
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarId,
  checkCarPayload
} = require('./cars-middleware');

const get_mw = [checkCarId];
const post_mw = [
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
]

router.get('/', async (req, res, next) => {
  try {
    const cars = await getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', get_mw, async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await getById(id);
    res.json(car)
  } catch (error) {
    next(error);
  }
})

router.post('/', post_mw, async (req, res, next) => {
  try {
    const id = await create(req.body);
    const car = await getById(id);
    res.status(201).json(car);
  } catch (error) {
    next(error)
  }
})

module.exports = router;
