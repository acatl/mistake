/*!
 * @author Acatl Pacheco <acatl.pacheco@gmail.com>
 * @license MIT Licensed
 */
'use strict';

/**
 * set keys to target
 * @param {Object} target
 * @param {Object} spec
 */
function setSpecKeys(target, spec) {
  var key;
  for (key in spec) {
    target[key] = spec[key];
  }

  return target;
}

/**
 * create instance of factory
 * @param  {Function} Factory constructor
 * @param  {String} name
 * @param  {String|Object} spec
 * @return {Object}         instanceOf Error
 */
function create(Factory, name, spec) {
  var error = new Factory();
  error.name = name;

  var specType = typeof spec;
  if (specType === 'string') {
    error.message = spec;
  } else {
    spec = spec || {};
    setSpecKeys(error, spec);
  }

  return error;
}

/**
 * Extend Error constructor
 * @param  {Function} Factory constructor
 * @return {Function}         constructor instanceOf Error
 */
function extendError(Factory) {
  Factory.prototype = Object.create(Error.prototype);
  Factory.prototype.constructor = Factory;
  return Factory;
}

/**
 * get Error factory
 * @param  {Function} Factory
 * @return {Function}         constructor instanceOf Error
 */
function getErrorFactory(Factory) {
  if (typeof Factory === 'function' && Factory.prototype !== Error.prototype) {
    return extendError(Factory);
  }

  return Error;
}

/**
 * create new error object
 * @param  {String} name           name of the error
 * @param  {String|Object} spec    message of the error or a hash with keys
 *                                 to pass to the error instance
 * @param  {Function} Factory      (Optional) Constructor to create the
 *                                 error off of
 * @return {Error}                 new error instance
 */
function mistake(name, spec, Factory) {
  var ErrorFactory = getErrorFactory(Factory);
  return create(ErrorFactory, name, spec);
}
