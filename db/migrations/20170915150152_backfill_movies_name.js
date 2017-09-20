'use strict';

exports.up = function (Knex, Promise) {
  return Knex.raw('UPDATE movies SET name = title WHERE name IS NULL');
};

exports.down = function (Knex, Promise) {
  return Promise.resolve();
};
