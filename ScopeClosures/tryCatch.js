let json = '{"name": "Doug"}'

try {
    let user = JSON.parse(json);
    if(!user.age){
        throw new Error("Incomplete data: no age provided");
    }
}
catch (err) {
    console.log(err);
}