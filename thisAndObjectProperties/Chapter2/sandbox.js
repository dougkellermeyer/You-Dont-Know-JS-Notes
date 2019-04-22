function multiply (a,b) {
    return (a*b);
};

console.log(multiply(1,5));

function fook() {
    console.log( this.a );
}

var obj = {
    a: 2,
    fook: fook
};

obj.fook(); // 2

//---------------------some `this` practice---------------------------------------

function foo() {
    console.log(this);
}

let arrowFoo = () => foo();

function arrowFoo() {
    this // obj;
    foo.call(externalScope);
}

arrowFoo.call(obj);

let obj = {
    test: function test() {
        console.log(this); //obj

        //arrow function always points to obj
        return () => {
            // do stuff
            console.log(this);
        }
        //sort of how the magic of the arrow function works...
        let self = this;
        return function outer(params) {
            (function inner(params) {
                // do stuff
                console.log.call(this);
            }).call(self, params);
        }
    }
}

let logObj = obj.test();
logObj(); // obj
logObj.call(obj2); //obj

let obj3 = {
    log: logObj
};
obj3.log();

let getLogObj = obj.test;
let logObj2 = getLogObj();
logObj2(); // global