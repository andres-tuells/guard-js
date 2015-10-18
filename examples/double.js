
var g = require('../guard.js');



var isArray = Array.isArray;

var isNumber = function(value) {return typeof value === 'number';};



var double = g()
				.when(isNumber, function(x) {return 2 * x})
				.when(isArray, function(x) {return x.concat(x)})
				.any(function(x) {return x + x});


console.log('number:' + double(2));

console.log('string:' + double('hello'));

console.log('array:' + double([1, 2, 3]));


