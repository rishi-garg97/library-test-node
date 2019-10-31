/**
 * Created by rgarg on 27-09-2019.
 */
const modelSchema = require('../schema/modelSchema.json');
const _ = require("lodash");
const {GraphQLDate} = require('graphql-iso-date');

const schema = `
# registration type
scalar Date
type ${modelSchema.name} {
    id: ID!
    ${getFormModel()}
}
type Query {
    # Return all registrations
    ${modelSchema.name}: [${modelSchema.name}]
}
type Mutation {
    # Create a registration
    create(${getCreateArgs()}): ${modelSchema.name}
    delete(id: ID!): ${modelSchema.name}
}
`;


function getFormModel() {
    let args = '';
    _.each(modelSchema.properties, function (property) {
        // if (property.dataType === "Number") {
        //     property.dataType = "Int";
        // }
        // args += ` ${property.name}: ${property.dataType}`;
        let dataType = property.dataType;
        if (property.dataType === "Number") {
            dataType = "Int";
        } else if (property.dataType === "Enumeration") {
            if (property.array) {
                dataType = "[String]";
            } else {
                dataType = "String";
            }
        } else if (['Radio', 'Email', 'Measure', 'Password'].includes(property.dataType)) {
            dataType = "String";
        }
        args += ` ${property.name}: ${dataType}`;
        // args += ` ${property.name}: ${property.dataType === "Number" ? "Int" : property.dataType}`;

    });
    return args;
}

function getCreateArgs() {
    let args = '';
    _.each(modelSchema.properties, function (property) {
        // if (property.dataType === "Number") {
        //     property.dataType = "Int";
        // }
        // args += `${property.name}: ${property.dataType},`;
        let dataType = property.dataType;
        if (property.dataType === "Number") {
            dataType = "Int";
        } else if (property.dataType === "Enumeration") {
            if (property.array) {
                dataType = "[String]";
            } else {
                dataType = "String";
            }
        } else if (['Radio', 'Email', 'Measure', 'Password'].includes(property.dataType)) {
            dataType = "String";
        }
        args += ` ${property.name}: ${dataType},`;
        // args += ` ${property.name}: ${property.dataType === "Number" ? "Int" : property.dataType},`;

    });
    args = args.slice(0, -1);
    return args;
}

module.exports.dynamicSchema = schema;