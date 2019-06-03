//parse the string and create a hashmap for each letter

function hashMap(s){
    obj = {} //empty object
    
    //loop throught the string
    for(i = 0; i < s.length; i++){ 
        const letter = s[i] 
        if(obj[letter]){ //is the letter already in the obj?
            obj[letter] += 1 //if so, add +1 to that letters key, ex. a:2
        }else {
            obj[letter] = 1 //if the letter isn't there, make it there, ex. c:1
        }
    }
    return obj
}

console.log(hashMap("aabbbc")) // => { a: 2, b: 3, c: 1 }
