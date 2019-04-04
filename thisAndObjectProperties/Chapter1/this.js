//playing around with this and how it works.

//example of function() - this = global
function whatIsThis() {
    return this; //returns global object
};

//example of function.call(newThis) = newThis
function giveMeX() {
    return this.x;
};

const newX = {
    x: 2
};

const refToGiveMeX = giveMeX.call(newX); // 2

//example of obj.function - this = obj
var pets = {
    dog: 4,
    cat: 4,
    func: function () {
        console.log(this); //this is now the pets obj, so it'll print the obj in the console
    },
};

pets.func();

//example of () = > {doStuff}, this = whatever this is in the surrounding code,
// it borrows this from its parent closure

function closureTest(){
    const x = 1;
    this.x = x;

    const es6ThisExample = () => {
        console.log(this); //1
    };
    return es6ThisExample;
}

var outer = closureTest();

console.log (outer());


// ------------------- example from YouDontKnowJS -------------------------

function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call( this );
    console.log( greeting );
}

var me = {
    name: "Doug"
};

var you = {
    name: "Reader"
};

identify.call( me ); // DOUG
identify.call( you ); // READER

speak.call( me ); // Hello, I'm DOUG
speak.call( you ); // Hello, I'm READER

// -----------------------------------------------------------------------------

