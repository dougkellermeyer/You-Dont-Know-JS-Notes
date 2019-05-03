const a = {
    a: 'a'
  };
  const obj = {
    getThis: () => this,
    getThis2 () {
      return this;
    }
  };

  obj.getThis3 = obj.getThis.bind(obj);
  obj.getThis4 = obj.getThis2.bind(obj);
  const answers = [
    obj.getThis(), // undefined, arrow functions can't have their own `this` 
    //bound, it's baked in
    obj.getThis.call(a), // undefined, same reason as above

    obj.getThis2(), // obj
    obj.getThis2.call(a), // {a: 'a'}
    console.log(obj.getThis3()), // undefined
    obj.getThis3.call(a), // undefined
    obj.getThis4(), // obj
    obj.getThis4.call(a) // obj, it is already bound by obj.getThis4 = obj.getThis2.bind(obj), so doesn't return {a:'a'} as you might expect
  ];

  
