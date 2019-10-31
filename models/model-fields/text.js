module.exports = (property) => {
    let text = {};
    text['type'] = property.dataType;
    if (property.required) {
        text['required'] = true;
    }
    if (property.minLength) {
        text['min'] = property.minLength;
    }
    if (property.maxLength) {
        text['max'] = property.maxLength;
    }

    return text;
}
