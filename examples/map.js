
var g = require('../guard.js');
var stream = require('stream');
var Transform = stream.Transform;
var Readable = stream.Readable;

'use strict';

var isArray = Array.isArray;

var isNumber = function(value) {return typeof value === 'number';};

var isFunction = function(value) {return typeof value === 'function';};

var isString = function(value) {return typeof value === 'string';};

var isStream = function(value) {return value && isFunction(value.pipe);};

var isPromise = function(value) {return value && isFunction(value.then);};

var thenable = function(value) {
	return {
		then: function(fn) {
			return thenable(fn.call(null, value));
		}
	};
};

var map = g()
	.when(isArray, function(x, fn) {return x.map(fn);})
	.when(isNumber, function(x, fn) {return fn(x);})
	.when(isString, function(x, fn) {return '' + fn(parseInt(x));})
	.when(isPromise, function(x, fn) {return x.then(fn);})
	.when(isStream, function(x, fn) {
		var r = new stream.Transform({ objectMode: true });
		r._transform = function(chunk, encoding, done) {
			this.push(fn(chunk));
     		done();
		};
		return x.pipe(r);
	});

var double = function(x) {return x * 2};

console.log('Number:' + map(2, double));

console.log('Array:' + map([1, 2, 3, 4], double));

console.log('String:' + map('-2', double));

map(thenable(2), double).then(function(value) {
	console.log('Number from promise:' + value);
});



var rs = new Readable({ objectMode: true });
rs.push(2);
rs.push(4);
rs.push(null);

var ws = new stream.Writable({
  objectMode: true,
  write: function(chunk, encoding, next) {
    console.log('Pipe:' + chunk);
    next();
  }
});

map(rs, double).pipe(ws);
