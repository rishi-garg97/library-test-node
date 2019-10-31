module.exports = (property) => {
    let enumType = {};
    if(property.array) {
        enumType['type'] = [];
    } else {
        enumType['type'] = "String";
    }
    if (property.required) {
        enumType['required'] = true;
    }

    return enumType;
}
