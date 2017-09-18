'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movies/create');

describe('movie validator', () => {
  describe('name', () => {

    it('is an invalid key', () => {
      const payload = { title: 'test', name: 'test' };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('name');
      expect(result.error.details[0].type).to.eql('object.allowUnknown');
    });

  });

  describe('title', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      let longInvalidTitle = '';
      for (let i = 0; i < 256; i++) {
        longInvalidTitle += 'a';
      }

      const payload = { title: longInvalidTitle };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('year', () => {

    it('is after 1878', () => {
      const payload = {
        title: 'test title',
        release_year: 1800
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'test title',
        release_year: 12345
      };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path[0]).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
