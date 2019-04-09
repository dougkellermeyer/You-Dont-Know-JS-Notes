# Chapter 1: `this` or That?

## What is `this` and how is it used?

* `this` is a special keyword that's baked in or automatically defined in the scope of every function

  ```javascript
    var test = {
        prop: 42,
        func: function() {
            return this.prop;
        },
    };

    console.log(test.func());
    // expected output: 42
  ```

  * If you took away the `this` in the `return` of `func()`, then this won't work 
  * That's somewhat obvious because `func()` doesn't know about `prop` but what we're interested in is the **how**
  * As long as the code is NOT in `strict mode`, then `this` defaults to the global object. This (man that's annoying) is how `func()` is able to share `prop` with test and hence the `console.log` works

* In summary:
  - **Short version**:
    - `function()` - this -> global
    - `obj.function` - this -> `obj`
    - `function.call(newThis, ...)` this -> `newThis`
    - `() => { doStuff }` - this -> whatever `this` is in the surrounding code (it borrows `this` from it's parent closure)
* Another way to think about `this`, **how you call a function/method**
  * ```javascript
        var test = {
            func: function() {
                return this;
            },
        };
        // returns `test`
        console.log(refToFunc);
        // returns global object
        var refToFunc = test.func;
        console.log(refToFunc);
    ```








* Here's a another example: 

    ```javascript

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
    ```

* There's a good bit going on there, so let's break it down:
  * After skimming through this, you may or may not be familiar with the `.call()` method
    ## The `.call()` method allows for a function belonging to one object to be assigned and called for a different object
  * `call()` provides a new value of `this` to the function. One benefit of doing this (see what I did there), is that you can write a method once and then inherit it from another object, instead of having to rewrite the method for the new object

  * Basic idea for the above example: `function.call(newThis, ...)` this -> `newThis`
    - We are calling the `identify()` function using `call()` and then we are providing the object we'd like to assign/add to that function, which is represented by the `this`.
     - So, when we see this:
     ```javascript
    identify.call(me);
     ``` 
    We are calling the `identify` function, and passing in the `me` object ("Doug") in for `this` in the `return` of the function:
    ```javascript
    return this.name.toUpperCase(); //`this` is now the me object
    //me.name.toUpperCase() is simply "Doug".toUpperCase() or "DOUG"
    ```
      Here's a good video for the `call()` function - https://www.youtube.com/watch?v=CCb96W92A54

    * In case you need another example (from - https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch1.md):

    * In this example, `this` is actually `foo`
    ```javascript
    function foo(num) {
            console.log( "foo: " + num );

            // keep track of how many times `foo` is called
            // Note: `this` IS actually `foo` now, based on
            // how `foo` is called (see below)
            this.count++;
    }

    foo.count = 0;

    var i;

    for (i=0; i<10; i++) {
        if (i > 5) {
            // using `call(..)`, we ensure the `this`
            // points at the function object (`foo`) itself
            foo.call( foo, i );
        }
    }
    // foo: 6
    // foo: 7
    // foo: 8
    // foo: 9

    // how many times was `foo` called?
    console.log( foo.count ); // 4
    ```

    * In case that's confusing (which is certainly was for me the first time around), here's what's happening:
      * We are calling the `foo` method (`foo.call(foo,i)`) and giving it a new `this`, which is `foo`. So when `foo` is being called here, we are assigning `this` as in `this.count++` turns into `foo.count++`. We are also passing in `i` as the argument for the `foo` method. 
      * This allows `this.count++` to be assigned as `foo.count` and thus when the for loop iterates, we get the printout of `// foo: 6, 7,8,9`, because we're calling `foo()` and passing in `i` each time.

