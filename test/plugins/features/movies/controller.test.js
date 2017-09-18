'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    const assertMovieCreated = function (payload, expectedName) {
      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(expectedName);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(expectedName);
      });
    };

    it('creates a movie with name', () => {
      const expectedName = 'WALL-E';
      const payload = { name: expectedName };

      return assertMovieCreated(payload, expectedName);
    });

    it('creates a movie with title', () => {
      const expectedName = 'WALL-E';
      const payload = { title: expectedName };

      return assertMovieCreated(payload, expectedName);
    });

  });

});
