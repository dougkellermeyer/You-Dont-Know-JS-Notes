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

-------**Stopped at `Loops + Closure`**---------