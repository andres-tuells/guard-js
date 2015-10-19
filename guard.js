
/**
 * @license
 * guardianjs 0.1 <https://hamelinjs.com/>
 * Copyright 2015 Andrés Tuells Jansson
 * Available under MIT license <https://hamelinjs.com/license>
 */

'use strict';


/**
   * Creates a function guardian.
   * XXX Example of use
   * @public
   * @return {Object} Returns `guardian`.
   */
exports = module.exports = function() {
	var self = function() {
		for (var i = 0; i < self.__when__.length; i++) {
			var c = self.__when__[i];
			if (c.filter.apply(this, arguments))return c.fn.apply(this, arguments);
		}
		if (self.__any__)return self.__any__.apply(this, arguments);
		console.log(arguments);
		throw new Error('No guard defined for this arguments');
	};
	self.__when__ = [];
	self.__any__ = null;

	/**
   	* Adds a guard clause to a function. The clauses is added at the end of the other clauses. Clauses are tested in FIFO order.
   	*
   	* @public
   	* @param {Function} filter of the guard. If the filter returns true the guard is resolved and function fn is executed with arguments.
   	* @param {Function} function to be executed if filter is true.
   	* @return {Object} self.
    */
	self.when = function(filter, fn) {
		self.__when__.push({filter: filter, fn: fn});
		return self;
	};

	/**
   	* Adds a guard clause to a function. The clauses is added at the beginning of the other clauses and is going to be tested before.
   	*
   	* @public
   	* @param {Function} filter of the guard. If the filter returns true the guard is resolved and function fn is executed with arguments.
   	* @param {Function} function to be executed if filter is true.
   	* @return {Object} self.
    */
	self.headWhen = function(filter, fn) {
		self.__when__.unshift({filter: filter, fn: fn});
		return self;
	};

	/**
   	* Adds a default function to be executed if no when clause is fullfilled.
   	* @public
   	* @param {Function} function to be executed if no when clause is fullfilled.
   	* @return {Object} self.
    */
	self.any = function(fn) {
		self.__any__ = fn;
		return self;
	};

	return self;
};
