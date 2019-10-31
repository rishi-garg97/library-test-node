module.exports = (property) => {
    let email = {};
    email['type'] = "String";
    if (property.required) {
        email['required'] = true;
    }
    return email;
}
