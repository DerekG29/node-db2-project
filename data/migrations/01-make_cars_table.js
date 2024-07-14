exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.text('vin')
      .unique()
      .notNullable();
    tbl.text('make')
      .notNullable();
    tbl.text('model')
      .notNullable();
    tbl.decimal('mileage')
      .notNullable();
    tbl.text('title');
    tbl.text('transmission');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
