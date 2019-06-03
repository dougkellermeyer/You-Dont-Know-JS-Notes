//ex. from Chapter 2
function foo(something) {
	console.log( this.a, something ); //this.a = 2, something = 3
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
    return foo.apply(obj, arguments); //hard binding obj and this to foo
    //remember the format for apply is func.apply(thisArg, [argsArray])
    //the arguments above is the arguments array that is built into all functions 
    //essentially, arguments is the array 
};

var b = bar( 3 ); // => 2 3 . This is the console.log() from line 3
console.log( b ); // => 5

//--------------------another example of hard binding-------------
obj2 = {
    c: 2
}

function doo(...args){
    console.log(args) //=> [Arguments] { '0': 5, '1': 2, '2': 1 }
    console.log(this.c)
    return this.c + args.reduce((a,b)=> a +b)
}

var bar = function(){
    return doo.apply(obj2, arguments)
}

var d = bar(5,2,1)
console.log(d) //=> 10