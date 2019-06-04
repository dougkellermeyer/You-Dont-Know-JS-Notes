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

// you can replace apply() with spread syntax (...)

function sum(x, y, z) {
    return x + y + z;
  }
  
  const numberss = [1, 2, 3];
  
  console.log(sum(...numberss)); //using spread syntax
  // expected output: 6
  
  console.log(sum.apply(null, numberss)); //using apply
  // expected output: 6