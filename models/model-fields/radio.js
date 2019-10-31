module.exports = (property) => {
    let radio = {};
    radio['type'] = "String";
    if (property.required) {
        radio['required'] = true;
    }
    return radio;
}
