//playing around with this and how it works

function giveMeX() {
    return this.x;
};

const newX = {
    x: 2
};

const refToGiveMeX = giveMeX.call(newX); // 2
console.log(refToGiveMeX);


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