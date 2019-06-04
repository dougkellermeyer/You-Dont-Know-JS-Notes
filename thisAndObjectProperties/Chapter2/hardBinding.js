//ex. from Chapter 2
function foo(something) {
	console.log( this.a, something ); //this.a = 2, something = 3
	return this.a + something;
}

var obj = {
	a: 2
};

var baz = function() {
    return foo.apply(obj, arguments); //hard binding obj and this to foo
    //remember the format for apply is func.apply(thisArg, [argsArray])
    //the arguments above is the arguments array that is built into all functions 
    //essentially, arguments is the array 
};

var b = baz( 3 ); // => 2 3 . This is the console.log() from line 3
console.log( b ); // => 5

//--------------------another example of hard binding-------------
function doo(){
    console.log(arguments) // [Arguments] { '0': 5, '1': 2, '2': 1 }
    console.log(this.c ) // 2
	let sumOfArgs = [...arguments].reduce((sum, x) => sum + x); // 5 + 2 + 1 = 8
    return this.c + sumOfArgs; // 2 + 8 
}

var obj2 = { c: 2 };
var bar = function(){
    return doo.apply(obj2, arguments) //hard binding obj to doo, so the `this` is the global this rather than for doo
}

var d = bar(5,2,1)
console.log(d) //=> 10 (2+8)