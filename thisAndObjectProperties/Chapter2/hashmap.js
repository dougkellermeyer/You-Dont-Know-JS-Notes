function hashMap(s){
    obj = {}

    for(i = 0; i < s.length; i++){
        const letter = s[i]
        if(obj[letter]){
            obj[letter] += 1
        }else {
            obj[letter] = 1
        }
    }
    return obj
}

console.log(hashMap("aabbccdddeeefff"))
