const vinValidator = require('vin-validator');
const { object, string, number } = require('yup'); 

const { 
  getById,
  getByVin
} = require('./cars-model');

const schema = object({
  vin: string()
    .required('vin'),
  make: string()
    .required('make'),
  model: string()
    .required('model'),
  mileage: number()
    .required('mileage'),
  title: string(),
  transmission: string(),
})

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await getById(id);
    if (!car) {
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkCarPayload = async (req, res, next) => {
  try {
    const payload = await schema.validate(req.body);
    req.body = payload;
    next();
  } catch (error) {
    const field = error.errors[0];
    res.status(400).json({ message: `${field} is missing` });
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const isValid = vinValidator.validate(vin);
  if (!isValid) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const exists = await getByVin(vin);
    if (exists) {
      res.status(400).json({ message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
}

module.exports ={
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarId,
  checkCarPayload
}
