// resolvers.js
const {GraphQLScalarType} = require("graphql");
const _ = require("lodash");
const modelSchema = require('../schema/modelSchema.json');
// Connection With MongoDb
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const {GraphQLDate} = require('graphql-iso-date');
const mongoOperation = require("../mongo/index.js");

const entityController = require("../controllers/entity.controller.js");
const dynamicDb = require("../config/config.js");

let DB;
let collection = [{}];
let dbOperations = null;

let entity_controller = entityController(dynamicDb);

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err);
    } else {
        // DB = client.db("dynamicGraph");
        dbOperations = mongoOperation(DB);
        // console.log("Dynamic Db created");
        // collection = DB.collection('dynamicUser').find().toArray((err, items) => {
        //     collection = items;
        // });
    }
});

const resolvers = {
    Date: GraphQLDate,

    Query: {
        Protocol: ()  => {
            let res =  entity_controller.getData();
            // console.log("Response", res);
            return res;
        },
    },
    Mutation: {
        create: (root, args) => {
            // dbOperations.save(args);
            // console.log(args);
            entity_controller.create(args);

        },
        delete: (root, args) => {
            entity_controller.delete(args);
            // dbOperations.remove(args);
        }
    }
};

module.exports.dynamicResolvers = resolvers;