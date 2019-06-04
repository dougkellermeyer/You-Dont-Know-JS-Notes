function argsDemo(a, b, ...args) {
	console.log(...arguments);
	console.log(...args);//grabs anything after the named variables
}

argsDemo(1,2,3,4,5,6,7);
// `...arguments` => 1 2 3 4 5 6 7
// `...args` ======> 3 4 5 6 7