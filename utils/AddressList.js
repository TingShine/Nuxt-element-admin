const  Address = require('./cityData.json')

export default () => {
    return Address.map(val => handleData(val));
}

 let handleData = (obj) => {
    if(obj == undefined || obj == null) {
        return false;
    }
    let temp = {
        label: obj['n'],
        value: obj['n']
    }
    if(obj.hasOwnProperty('s')) {
        temp.children = [];
        temp.children = obj['s'].map(val => handleData(val))
    }
    return temp;
 }