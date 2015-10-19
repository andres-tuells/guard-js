# guard-js

This library implement Elixir style guards for javascript. 

An Elixir guard is like this:


```elixir
defmodule Geometry do
  def area({:rectangle, w, h}) do
    w * h
  end

  def area({:circle, r}) when is_number(r) do
    3.14 * r * r
  end
end
``` 

Instead of having a function with if clauses inside we can define the conditions with the function.
We have polymorphism for functions and methods. 

## Quickstart

To install:
```
npm install guard-js
```
and the code:

```javascript
var guard = require("guard");

var double = guard()
				.when(isNumber, function(x) {return 2 * x})
				.when(isArray, function(x) {return x.concat(x)})
				.any(function(x) {return x + x});

double(2);
//4

double('hello');
//'hellohello'

double([1,2,3]);
//[1,2,3,1,2,3]

```


### A map example

A more interesting examples is a map function that works like this:

```javascript
 var new_collection = map(collection, x=>x*2);
``` 

We want this map work with differents types of collections, like arrays and streams

```javascript

var g = require('guard-js');

'use strict';

var isArray = Array.isArray;

var isStream = function(value) {return value && isFunction(value.pipe);};

var isFunction = function(value) {return typeof value === 'function';};

var map = g()
	.when(isArray, function(x, fn) {return x.map(fn);})
	.when(isStream, function(x, fn) {
		var r = new stream.Transform({ objectMode: true });
		r._transform = function(chunk, encoding, done) {
			this.push(fn(chunk));
     		done();
		};
		return x.pipe(r);
	});

//We can use map with arrays and streams

map([1,2,3], x=>x*2);
//[2,4,6]


var rs = new Readable({ objectMode: true });
rs.push(1);
rs.push(2);
rs.push(3);
rs.push(null);

var ws = new stream.Writable({
  objectMode: true,
  write: function(chunk, encoding, next) {
    console.log(chunk);
    next();
  }
});

map(rs, double).pipe(ws);
\\2
\\4
\\6

```

Look in the examples folder for more.