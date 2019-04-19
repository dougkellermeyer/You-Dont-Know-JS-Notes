# Chapter 2: `this` Mostly Makes Sense Now!

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

