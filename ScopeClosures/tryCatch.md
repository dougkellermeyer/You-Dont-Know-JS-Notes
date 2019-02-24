# Trying out (see what I did there) some `try` and `catch`

* We use `try{}`, `catch{}`, `finally{}`, and `throw{}` MOST of often when we use data from an **external source** or on **user forms**

## `try{}` - let's you test a block of code for errors

## `catch{}` let's you handle the error from your `try`

```javascript
try {
    thisFunctionIsntReal();
}
catch (err) {
    console.log(err);
    //ReferenceError: nonExistentFunction is not defined
}
```

## `throw{}` - lets you create custom errors
* Let's say you have a user form that requires a name and an age:

```javascript

let json = {
    "name": "Doug"
    //missing age data
}

try {
    let user = JSON.parse(json);
    if(!user.age){
        throw new Error("Incomplete data: no age");
    }
}
catch (err) {
    console.log(err.message);
    //Incomplete data: no age
}

```

## `finally{}` - lets you execute code after the `try/catch`, regardless of the result

```javascript
try {
    thisFunctionIsntReal();
}

catch (err) {
    console.log(err);
    //ReferenceError: nonExistentFunction is not defined
} finally {
    console.log("This code runs no matter what");
}
```