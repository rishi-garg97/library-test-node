const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getTextFieldModel = require('./model-fields/text.js');
const getNumberFieldModel = require('./model-fields/number.js');
const getEnumFieldModel = require('./model-fields/enum.js');
const getRadioFieldModel = require('./model-fields/radio.js');
const getEmailFieldModel = require('./model-fields/email.js');
const getMeasureFieldModel = require('./model-fields/measure.js');
const getPasswordFieldModel = require('./model-fields/password.js');

const modelSchema = require('../schema/modelSchema.json');

let schema = {};
_.each(modelSchema.properties, (property) => {
    if (property.dataType === "String") {
        schema[property.name] = getTextFieldModel(property);
    } else if (property.dataType === "Number") {
        schema[property.name] = getNumberFieldModel(property);
    } else if (property.dataType === "Enumeration") {
        schema[property.name] = getEnumFieldModel(property);
    } else if (property.dataType === "Radio") {
        schema[property.name] = getRadioFieldModel(property);
    } else if (property.dataType === "Email") {
        schema[property.name] = getEmailFieldModel(property);
    } else if(property.dataType === "Measure") {
        schema[property.name] = getMeasureFieldModel(property);
    } else if(property.dataType === "Password") {
        schema[property.name] = getPasswordFieldModel(property);
    }
});

let EntitySchema = new Schema(schema);
// console.log(EntitySchema);
module.exports = mongoose.model("Entity", EntitySchema);