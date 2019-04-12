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

## Call-site and `this` rules

* There are 4 rules that apply to the **call-site**

### Default Binding 
* The most common case of function calls are **standalone function invocation**

* As the name implies, this is the default `this` binding if no other rules apply


