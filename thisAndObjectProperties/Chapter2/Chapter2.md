# Chapter 2: `this` Makes Sense Now (mostly)!

* From Chapter 1, we learned that `this` is special keyword baked into every function

* Another way to think about this is a **binding** made for each function invocation
  * `this` binding depends on the location **where** the function is *called*, **NOT** where its *declared*
  * The "where" the funciton is called is known as  the **call-site**

## Call-site

Here's an example demonstrating **call-site**:

```javascript
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```

* You'll also notice **call-stack** in there, which is the stack of functions that have been called to get to the current moment in execution
  * **It's MUCH faster to review the call-stack in the dev tools of a web browser, as opposed to tracking it manually as we have here**


# Call-site and `this` Binding Rules

* There are 4 rules that apply to the **call-site**

## 1. Default Binding 
* The most common case of function calls are **standalone function invocation**

* As the name implies, this is the default `this` binding if no other rules apply
  * Here's a quick example: 

    ```javascript
    function foo() {
        console.log( this.a );
    }

    var a = 2;

    foo(); // 2 -> this is also the call-site for foo()
    ```
* So, let's break this down:
  * Since `a` is defined as a global variable and is part of the **global scope**
  
    ```javascript 
    var a = 2 //global variable
    ```
  * When `foo()` is called, `this.a` resolves to the global variable `a` due the **default binding** for `this`, and points `this` to the global object. 
    * In other words:
    ```javascript
    this.a = globalObject.a // or 2!
    ```

* Now, this assumes that you're **NOT** in `strict mode`. If you were, the **global object** is not eligible for **default binding**
    ```javascript 
    function foo() {
	"use strict";

	console.log( this.a );
    }

    var a = 2;

    foo(); // TypeError: `this` is `undefined`
    ```
## 2. Implicit Binding
* When there is a **context object** for a function reference, the **Implicit Binding** rule says that it's THAT object which should be used for the function's `this` binding.
  * So that is a lot of words, sorta confusing right? 
  * I found it easier to look at an example: 
  ```javascript
    function foo() {
	console.log( this.a );
    }

    var obj = {
        a: 2,
        foo: foo
    };

    obj.foo(); // 2
  ```
  * Looking above, we have `foo()` being called but PRECEDED by the `obj` object here:
    ```javascript
    obj.foo();
    ```
  * This is important because, `obj` is our **context object** for the `foo()` function, which means `this` is bound to `obj` rather than our `foo()`.
    * So, `this.a` is equivalent too `obj.a` 
    * This explains why we still get `2` when we call `obj.foo()`

* It's also worth noting that only the **last** level of object property reference chain or the **context object** that matters.
  * So, if we have two objects that precede the function, only the second/last one is what matters
  ```javascript
    function foo() {
	console.log( this.a );
    }

    var obj2 = {
        a: 42,
        foo: foo
    };

    var obj1 = {
        a: 2,
        obj2: obj2
    };

    obj1.obj2.foo(); // 42
  ```

* Often it can **seem like implicit binding**, when in fact, it's just default binding
    * For example: when we pass a **callback function**
    ```javascript
    function foo() {
	console.log( this.a );
    }

    function doFoo(fn) {
        // `fn` is just another reference to `foo`

        fn(); // <-- call-site!
    }

    var obj = {
        a: 2,
        foo: foo
    };

    var a = "oops, global"; // `a` also property on global object

    doFoo( obj.foo ); // "oops, global"
    ```
* We get the string `"oops, global"` back because `this.a` is referencing the global object 

## 3. Explicit or Hard Binding
* As we just saw, our function `foo()` loses its `this` binding, as it just defaults back to the default binding
  * Now that's not to say we can't mutate the object we want to bind to inlcude a reference on itself to the function, and use the property function to implicitly/indirectly bind the `this` to the obj - like THIS: (damn that's annoying)
    ```javascript
    function foo() {
	console.log( this.a );
    }

    var obj = {
        a: 2,
        foo: foo
    };

    obj.foo(); // 2
    ```
* How could we ensure that the function's `this` is bound to the function? Let's see: 
  ```javascript
    function foo() {
	console.log( this.a );
    }

    var obj = {
        a: 2
    };

    foo.call(obj); // 2
  ```  
  * So, we can **force** `this` to be found to our `obj` by invoking `foo` with *explicit binding*.
  * You'll notice we used `call()` to do this, which gives us a new instance of `this` that we can assign to the `obj` instead of the global variable `a`

* So that's cool and all but that still doesn't solve our problem of a function "losing" it's `this` binding, as we saw with the example when we passed a callback function: 
  ```javascript
    function foo() {
	console.log( this.a );
    }

    var obj = {
        a: 2,
        foo: foo
    };

    var a = "oops, global"; // `a` also property on global object

    setTimeout( obj.foo, 100 ); // "oops, global"
  ```
* So how can we ensure that `this` is bound to our `obj`? Let's use a variation of **explicit binding**: 
    ```javascript
    function foo() {
	console.log( this.a );
    }

    var obj = {
        a: 2
    };

    var bar = function() {
        foo.call( obj );
    };

    bar(); // 2
    setTimeout( bar, 100 ); // 2

    // `bar` hard binds `foo`'s `this` to `obj`
    // so that it cannot be overriden
    bar.call( window ); // 2
    ```
* This variation is known as **hard binding** and focibly invokes `foo` with `obj` binding for `this`
  * In other words, no matter how you invoke `bar()`, it will always manually invoke `foo` with `obj`





