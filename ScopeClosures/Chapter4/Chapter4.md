# Chapter 4: Hoisting

* Going back to Chapter 1, remember that our code is compiled before the Engine can execute it. 
* It is during the compilation phase that **declaration** happens (variables, functions, etc.) 
  * It isn't until the code is executed that **assignment** happens

    ```javascript
    var a;

    a = 2;

    console.log(a) //2
    ```
  * Notice how although `var a;` comes before `a = 2`, the `console.log` will still print `2`. 
  * This is because, when compiled, variable and function declarations are "moved up" or **hoisted** up from where they appear in the code. 
    * What's IMPORTANT to keep in mind is that the ONLY aspect that gets hoisted is the **declarations**, any **assignment** or **execution** stays where it is in the code and is NOT hoisted
    * Also, It's worth noting that hoisting is **per-scope** 

* Here's another example:
    ```javascript
    foo(); // TypeError! (not a ReferenceError)
    bar(); //ReferenceError

    var foo = function bar() {
        //code...
    };
    ```
  * `foo()` produces a `TypeError` because `foo()` is `undefined` - the variable `var foo = ` was hoisted to the top of scope (global in this case), however the function's exection was not. In other words, it knows that `foo` exists, but doens't know what it is
  * Similarly, `bar()` produces a `ReferenceError`, because although `foo` was declared, it's execution, which is where `bar()` lives, has NOT yet been executed

## Functions get hoisted FIRST
* Functions bet hoisted to the top of the scope compiler BEFORE variables

    ```javascript

    foo(); //1

    var foo;

    function foo() {
        console.log(1);
    }

    foo function() {
        console.log(2);
    }
    ``` 
  * You might expect the `console` to print `2`, however because functions are hoisted first, it prints `1`

  SO, in short, **declarations** happen BEFORE **executions** and functions get hoisted before variables. 
