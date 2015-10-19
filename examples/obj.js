
var g = require('../guard.js');

//guards work with objects too

function Obj(value){this.value = value}

var obj1 = new Obj(2);

var obj2 = new Obj(3);


Obj.prototype.doubleEven = g()
				.when(function(){return this.value%2==0;}, function(x) {return 2 * this.value})
				.any(function(){return 0;});


console.log('obj1:' + obj1.doubleEven());

console.log('obj2:' + obj2.doubleEven());


