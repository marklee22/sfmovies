'use strict';

exports.up = function (Knex, Promise) {
  return Knex.schema.table('movies', (table) => {
    table.dropColumn('title');
  })
  .then(() => {
    return Knex.raw('ALTER TABLE movies ADD CONSTRAINT movies_name_not_null CHECK (name IS NOT NULL) NOT VALID');
  });
};

exports.down = function (Knex, Promise) {
  return Knex.schema.table('movies', (table) => {
    table.text('title');
  })
  .then(() => {
    return Knex.raw('ALTER TABLE ONLY movies DROP CONSTRAINT movies_name_not_null');
  });
};

exports.config = { transaction: false };