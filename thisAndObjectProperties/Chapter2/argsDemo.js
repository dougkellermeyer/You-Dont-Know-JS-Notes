function argsDemo(a, b, ...args) {
	console.log(...arguments);
	console.log(...args);//grabs anything after the named variables
}

argsDemo(1,2,3,4,5,6,7);
// `...arguments` => 1 2 3 4 5 6 7
// `...args` ======> 3 4 5 6 7

const numbers = [1, 2, 3];
const add3 = (a, b, c) => console.log(a + b + c);
add3(...numbers); // => add3(numbers[0], numbers[1], numbers[2], ...)

function dial(...grandma) {
	console.log(grandma);
}
dial(8, 6, 7, 5, 3, 0, 9);