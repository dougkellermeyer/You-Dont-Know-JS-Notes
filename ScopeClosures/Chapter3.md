# Chapter 3: Function vs. Block Scope

* Function-based scope is one of the most common ways to define scope. It helps keeps things separate and embraces the Single Responsibility Principle (that a function should **only** do ONE THING)

* Keeping functions' scope separate is important and helps reduce unexpected problems down the road

  * Here's a **BAD** example 
  ```javascript
  function doSomething(a) {
	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
    }


    function doSomethingElse(a) {
        return a - 1;
    }

    var b;

    doSomething( 2 ); // 15

    ```
 * Notice how the scope of `doSomething()`  gives access to `b` and `doSomethingElse()`. This is BAD PRACTICE, as you want to decouple and encapsulate functions/private information as much as possible 

 * Here is a BETTER way to to write this: 
 
    ```javascript
        function doSomething(a) {
            function doSomethingElse(a) {
                return a - 1;
            }

            var b;

            b = a + doSomethingElse( a * 2 );

            console.log( b * 3 );
        }

        doSomething( 2 ); // 15

    ```
* Notice how `b` and `doSomethingElse()` are NOT accessible to anything outside of `doSomething()`. By keeping the private information encapsulated in `doSomething()` will help reduce unexpected errors/issues, such as overwriting variables, in the future

* Utilizing such practices to hide or separate things in scope blocks can also help reduce code collision, or having two variables/identifiers with the same name being used in different ways. 

 * For example: 
    ```javascript
    function foo() {
        function bar(a) {
            i = 3; // changing the `i` in the enclosing scope's for-loop
            console.log( a + i );
        }

        for (var i=0; i<10; i++) {
            bar( i * 2 ); // oops, infinite loop ahead!
        }
    }

    foo();
    ```

 * Notice how `i` is defined in `bar()`, and then is **reassigned** later in the the `for` loop. 
    * To fix this, you could either define `i` as a local variable to `bar()`
    ```javascript
    function bar(a) {
		var i = 3; // changing the `i` in the enclosing scope's for-loop
		console.log( a + i );
	} 

    ```

    * Or, you could pick an entirely differnet variable name:
    ```javascript
    function bar(a) {
		var j = 3; // changing the `i` in the enclosing scope's for-loop
		console.log( a + j );
	} 
    ```
    * Either of these options would eliminate the collision of the `i` in `bar()` and the following `for` loop

## Function declarations vs. function expressions
* Functions that you don't need to reference later or are executing some setup steps can be written as **function expressions**:

    ```javascript
    // Invoke a "normal" function
    function test() { ... }
    test();

    // Use an IIFE (Immediatley Invoked Function Expression)
    (function testIIFE() { ... })();

    ```

 * Essentially, when you wrap a function in `()`, it is thrown away (unless you assign a variable to the result of the function) and does not become callable later. Also, and more importantly, it doesn't pollute your global scope  
   * It is **immediately** invoked by the trailing `()`
   * 

* Function expressions still behave like normal functions, they just exist as the result of the function being invoked. 
   * So you could **assign a variable to the result of the IIFE** like this: 
   ```javascript
   // Set a variable to the result of the IIFE
    var b = (function () {
        var a = 3;
        return a * 2;
    })();
    console.log(b) //6
   ```
   * You could also access a variable outside the scope of the IIFE, you just have to declare it before the IIFE.

   ```javascript
   // Access a variable outside the scope of the IIFE
    var b;
    (function example1() {
        var a = 3;
        b = a * 2;
    })();
   ```

## Let, Explicit Block-scoping, and Garbage Collection

* It's worth noting that `let` (in ES6), similar to `var`, attaches it self the scope block it is declared. 

  * Examples include a `for` loop:
    ```javascript
    //by declaring i with a let, it is explicitly scoped to the for loop
    for (let i=0; i<10; i++) {
        console.log( i );
    }

    console.log( i ); // ReferenceError
    ```

  * This is useful because if something is block-scoped, the JavaScript Engine can clean it up. This concept is known as **Garbage Collection**. 
     * Here's an example that does NOT utilize block-scoping: 
        ```javascript
        function process(data) {
        // do something interesting
        }

        var someReallyBigData = { .. };

        process( someReallyBigData );

        var btn = document.getElementById( "my_button" );

        btn.addEventListener( "click", function click(evt){
            console.log("button clicked");
        }, /*capturingPhase=*/false );
        ```
     * Because the `click()` function has access to the entire scope, the JavaScript Engine most likely will keep the `someReallyBigData`, which isn't a good thing

     * Here's a BETTER way to write this, utilizing explicit block-scoping:
        ```javascript
        function process(data) {
        // do something interesting
        }

        // because this is block-scoped, it can be garbage collected later!
        {
            let someReallyBigData = { .. };

            process( someReallyBigData );
        }

        var btn = document.getElementById( "my_button" );

        btn.addEventListener( "click", function click(evt){
            console.log("button clicked");
        }, /*capturingPhase=*/false );
        ```

## `Let` loops

* A good example of the usefulness of `let` (as seen as above) is a `for` loop. 
  * What's interesting though, is what happens when the variable (`i`) is being iterated over
  * "Not only does `let` in the for-loop header bind the `i` to the for-loop body, but in fact, it re-binds it to each iteration of the loop, making sure to re-assign it the value from the end of the previous loop iteration" - YDKJS
    * Take for example the following: 
    ```javascript
    {
        let j;
        for (j=0; j<10; j++) {
            let i = j; // re-bound for each iteration!
            console.log( i ); //0,1,2,3,4,5,6,7,8,9
        }
    }
    ```
