module.exports = (property) => {
    let number = {};
    number['type'] = 'Number';
    if(property.required) {
        number['required'] = true;
    }
    if(property.max && property.max !== null) {
        number['max'] = property.max;
    }
    if(property.min && property.min !== null){
        number['min'] = property.min;
    }
    return number;
}
