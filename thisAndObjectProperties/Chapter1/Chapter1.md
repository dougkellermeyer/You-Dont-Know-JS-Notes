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

  * If you were to take away the `this` in the `return` of `func()`, then this won't work 
  * That's somewhat obvious because `func()` doesn't know about `prop` but what we're interested in is the **how**
  * As long as the code is NOT in `strict mode`, then `this` defaults to the global object. This (man that's annoying) is how `func()` is able to share `prop` with test and hence the `console.log` works


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
    ### The `.call()` method allows for a function belonging to one object to be assigned and called for a different object
  * `call()` provides a new value of `this` to the function. One benefit of doing this (see what I did there), is that you can write a method once and then inherit it from another object, instead of having to rewrite the method for the new object