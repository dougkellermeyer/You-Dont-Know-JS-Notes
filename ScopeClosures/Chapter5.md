# Chapter 5: Scope Closure

## **Closure** - when a function is able to remember and access its lexical scope, even when the function is executing outside of its lexcial scope

```javascript
function foo(){
    var a = 2;

    function bar(){
        console.log(a);
    }

    return bar;
}

var baz = foo();

baz(); // 2
```

* A lot going on here. 
  1. `foo()` is executed
  1. We `return` the inner `bar()` function as a function object `bar`.
  1. Then we assign value that `foo()` returns (the inner `bar()` function) to a variable `baz`. 
  1. Finally, we invoke the `baz()` - which is essentially invoking our inner function `bar` (just by another variable `baz`)

* This clearly demonstrates **closure**, because `bar()`is accessing its orignal lexical scope but is being executed outside of its lexical scope - by invoking `baz()` which executes `bar()`
  * Another way to think about **closure** is that `bar()` still has access to its original scope, **that reference is closure**

## Loops & Closure

* Let's take a look at one of the more simple loops the `for-loop`:
    ```javascript

    for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
    }
    ```
    * At first glance, you might think that the console would print 1,2,3,4,5...and you would be wrong. It actually prints 6 out 5 times, every 1 second. 
      * Hmm but why??
      * Because the loop's terminating condition is when `i` is NOT less than or equal to 5, the first time this is true is 6. 
      * So, this means that the **timeout callbacks** are running **AFTER** the completion of the loop, and hence 6 is printed out 5 times. 
    
    * So how would we make the `for-loop` print out 1-5, on 1 second intervals? Perhaps we could use an IIFE to provide the `setTimeout` fuction with it's own scope. 

    ```javascript
    for (var i=1; i<=5; i++) {
        (function(){
            setTimeout( function timer(){
                console.log( i ); // 6 6 6 6 6 
            }, i*1000);
        })();
    }
    ```
    * So, even though we've given each timeout function callback has it's own scope it **still** doesn't give us what we want. WHY?
    * It turns out, even though it has it's own scope, it's still an emtpy scope...it needs **something** more in order to be useful...

    * Let's try this: 

    ```javascript
    //IIFE version, giving each timeout function callback its own per-iteration scope

    for (var i=1; i<=5; i++) {
        (function(){
            var j = i;
            setTimeout( function timer(){
                console.log( j ); //1 2 3 4 5 
            }, j*1000 );
        })();
    }
    ```
    * If you look closely, you'll notice that we provided our IIFE it's own variable `j`, or a copy of `i` for each iteration - neat huh?

* So this works, but it's still kinda messy though right? Like do we really need an IIFE here? 
* Nope! Remember how `let` lets us hijack the scope block and declares the variable right in the block? We'll that my friends is a wonderful thing for loops. Check it out: 

    ```javascript

    for (var i=1; i<=5; i++) {
        let j = i; // 
        setTimeout( function timer(){
            console.log( j ); //1,2,3,4,5
        }, j*1000 );
    }

    ```
* Now if think that was cool, it's even **cooler** when `let` is used in the head of a `for-loop`. It turns out that that the variable will not only be declared for the block but for **each** iteration! This gives us a much cleaner code and really sheds light on why we use `let` in loops:

    ```javascript
    for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i ); //1,2,3,4,5
	}, i*1000 );
    }
    ```
* Now for those of you that learned about `for-loops` before **scope** this might not seem that groundbreaking. You probably were like me and just thought "when I do a `for-loop`, I use `let` instead of `var`. Hopefully you'll have a Eureka moment like I did!

## Modules
* The module is a code pattern that utiltize closure to create independent sections of code. 

* **There are two "requirements" for the module pattern to be exercised:**

  1. There must be an outer enclosing function, and it must be invoked at least once (each time creates a new module instance).

  0. The enclosing function must return back at least one inner function, so that this inner function has closure over the private scope, and can access and/or modify that private state.

```javascript
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

---
* You'll notice that `CoolModule()` function is invoked with `var foo = CoolModule()`, which is necessary for a module instance to be created. 
* The `return` object acts as a **public API for our module**, in that it references the inner functions (`doSomething` and `doAnother`) but **NOT the inner data variables** (`something`, `another`).
  * You might be wondering how `foo.doSomething()` and `foo.doAnother()` are able to gain access to the inner variables then right??
  * The **key** is that the object `return` value is assinged to the variable `foo`. This allows us to access the property methods on the "API", like this: 
  ```javascript
    foo.doSomething(); // cool
  ```

