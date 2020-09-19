export default (obj1, obj2, arr = []) => {
    if(typeof obj1 !== 'object' && typeof obj2 !== 'object') {
        throw Error('params is not type object')
    }
    arr.forEach(val => {
        if(obj2.hasOwnProperty(val)) {
            obj1[val] = obj2[val]
        }
    })
    return obj1;
}