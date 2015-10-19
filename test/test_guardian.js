var assert = require('chai').assert;
var guardian = require('../guard.js');


function sum(a, b, c) {return a + b + c;}
function first(a, b, c) {return a;}
function second(a, b, c) {return b;}

function t() {return true;}
function f() {return false;}
function noop() {}

describe('Guardian#when', function() {

  it('account all params', function() {
  	var g = guardian().when(t, sum);
    assert(6 === g(1, 2, 3));
  });

  it('only if filter is true is executed', function() {
  	var g = guardian().when(f, first).when(t, second);
    assert(2 === g(1, 2, 3));
  });

  it('when are executed in fifo order', function() {
  	var g = guardian().when(t, first).when(t, second);
    assert(1 === g(1, 2, 3));
  });

  it('All params in filter are passed', function() {
  	var g = guardian().when(function(a, b, c) {return 6 === sum(a, b, c);},first);
    assert(1 === g(1, 2, 3));
  });

  it('guard still works as method', function() {
    var obj = new function(){this.a="A";}
    function h(){
      var f = function(){return this.a}; 
      return function(){return f.apply(this,arguments)}
    }
    obj.g = guardian().when(t, function(){return this.a});
    assert.equal(obj.g(),"A");
  });

});

describe('Guardian#headWhen', function() {

  it('account all params', function() {
  	var g = guardian().headWhen(t, sum);
    assert(6 === g(1, 2, 3));
  });

  it('only if filter is true is executed', function() {
  	var g = guardian().headWhen(f, first).headWhen(t, second);
    assert(2 === g(1, 2, 3));
  });

  it('headWhen are executed in lifo order', function() {
  	var g = guardian().headWhen(t, first).headWhen(t, second);
    assert(2 === g(1, 2, 3));
  });

});


describe('Guardian#any', function() {

  it('any is invoked', function() {
    var g = guardian().any(sum);
    assert(6 === g(1, 2, 3));
  });

  it('last any is invoked', function() {
    var g = guardian().any(first).any(second);
    assert(2 === g(1, 2, 3));
  });

  it('any is invoked if no when clause is fullfiled', function() {
    var g = guardian().when(f, noop).any(sum);
    assert(6 === g(1, 2, 3));
  });
});
