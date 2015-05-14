'use strict';

var should = require('should');
var mistake = require('../');

describe('create error object', function() {
  describe('basic', function() {
    before(function() {
      this.result = mistake('hello', 'world');
    });

    it('should get name and message assigned', function() {
      this.result.should.have.properties({
        name: 'hello',
        message: 'world'
      });
    });

    it('should be instance of Error', function() {
      this.result.should.be.instanceof(Error);
    });
  });

  describe('pass name and hash', function() {
    before(function() {
      this.result = mistake('hello', {
        message: 'world',
        foo: 'bar'
      });
    });

    it('assign name and hash keys', function() {
      this.result.should.have.properties({
        name: 'hello',
        message: 'world',
        foo: 'bar'
      });
    });
  });

  describe('pass name, hash, and constructor', function() {
    before(function() {

      function MyError(message) {
        this.name = 'MyError';
        this.message = message || 'Default Message';
      }

      this.MyError = MyError;

      var error = mistake('hello', {
        message: 'world',
        foo: 'bar'
      });

      this.result = mistake('hello', {
        message: 'world',
        foo: 'bar'
      }, MyError);

    });

    it('assign name and hash keys', function() {
      this.result.should.have.properties({
        name: 'hello',
        message: 'world',
        foo: 'bar'
      });
    });

    it('should be instance of Error', function() {
      this.result.should.be.instanceof(Error);
    });

    it('should be instance of Error', function() {
      this.result.should.be.instanceof(this.MyError);
    });
  });

});
