'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const payloadCopy = Object.assign({}, payload);

  if (payloadCopy.hasOwnProperty('title')) {
    payloadCopy.name = payloadCopy.title;
    Reflect.deleteProperty(payloadCopy, 'title');
  }

  return new Movie().save(payloadCopy)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};
