module.exports = (property) => {
    let measure = {};
    measure['type'] = "String";
    if (property.required) {
        measure['required'] = true;
    }
    return measure;
}