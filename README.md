# guardianjs

This library implement Elixir style guards for javascript. It allows polymorphism, 
having diferent implemetations for diferent conditions.

## How to use it

var guardian = require("guardian");

var double = guardian()
				.when(isNumber, function(x) {return 2 * x})
				.when(isArray, function(x) {return x.concat(x)})
				.any(function(x) {return x + x});

double(2);
//4

double('hello');
//'hellohello'

double([1,2,3]);
//[1,2,3,1,2,3]


In the examples folder you can learn more details of how to use this library.

