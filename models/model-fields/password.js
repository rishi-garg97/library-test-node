module.exports = (property) => {
    let password = {};
    password['type'] = "String";
    if (property.required) {
        password['required'] = true;
    }
    return password;
}