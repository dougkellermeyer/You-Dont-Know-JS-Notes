//apply() and call() accomplish the same thing, just in different ways
//call requires you to know all the args ahead of time so you can program them in, 
//apply gives you programmatic access to the args you pass in

//apply format:
//Function.prototype.apply(thisArg, [args])

//apply only accepts a single array but you can be sneaky, see the next comment
function x(a, b, c){
}
x.apply(null, [1, 2, 4]);
a = 1, b = 2, c = 4
this = null

//You specify null or undefined as the thisArg, apply(thisArg, [args]) 
//to simulate calling a function that is not part of an object prototype

//call format:
//Function.prototype.call(thisArg, args...)

//the code below accomplishes the same thing as the apply above:
function x(a, b, c){ 

} 
x.call(null, 1, 2, 4); 
// a = 1, b = 2, c = 4