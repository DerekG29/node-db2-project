const express = require("express")
const carsRouter = require('./cars/cars-router');

const server = express()

server.use(express.json());

server.use('/api/cars', carsRouter);

server.use((error, req, res, next) => { // eslint-disable-line
  console.error(error);
  res.status(500).json(error);
})

module.exports = server
