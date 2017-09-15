'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    const assertMovieCreated = function (payload, expTitle) {
      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(expTitle);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(expTitle);
      });
    };

    it('creates a movie with name', () => {
      const expTitle = 'WALL-E';
      const payload = { name: expTitle };

      return assertMovieCreated(payload, expTitle);
    });

    it('creates a movie with title', () => {
      const expTitle = 'WALL-E';
      const payload = { title: expTitle };

      return assertMovieCreated(payload, expTitle);
    });

  });

});
