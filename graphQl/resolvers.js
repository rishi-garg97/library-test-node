// resolvers.js
const {GraphQLScalarType} = require("graphql");
const _ = require("lodash");


// Connection With MongoDb
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let DB;
let collection = [{}];

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err);
        return
    } else {
        DB = client.db("graph");
        console.log("Db created");
        collection = DB.collection('user').find().toArray((err, items) => {
            collection = items;
        });
    }
});

const resolvers = {
    Query: {
        Registrations: () => collection, // return all registrations
        Registration: (_, {id}) => collection.find(registration => registration.id == id) // return registration by id

    },
    Mutation: {
        // create a new registration
        createRegistration: (root, args) => {
            // get next registration id
            let nextId;
            DB.collection('user').find().toArray((err, registrations) => {
                if (!registrations.length) {
                    nextId = 1;
                } else {
                    let maxIdUser = 1;
                    _.each(registrations, function (registration) {
                        if (maxIdUser < registration.id) {
                            maxIdUser = registration.id;
                        }
                    })
                    nextId = maxIdUser + 1;
                }
                const newRegistration = {
                    id: nextId,
                    firstName: args.firstName,
                    lastName: args.lastName
                };

                DB.collection('user').insertOne(newRegistration, (err, result) => {
                });
                collection.push(newRegistration);
                return newRegistration;
            })
        }, // delete registration by id
        deleteRegistration: (root, args) => {
            // remove registration by index
            DB.collection("user").deleteOne({id: Number(args.id) }, (err, result) => {
                if(err){
                    return err;
                }
            });
            const index = collection.findIndex(
                registration => registration.id == args.id
            );
            collection.splice(index, 1);

        }, // update registration
        updateRegistration: (root, args) => {

            DB.collection("user").updateOne({id: Number(args.id)}, {'$set': {'firstName': args.firstName, 'lastName': args.lastName }}, (err, item) => {
                console.log(item)
            })
            // find index by id
            const index = collection.findIndex(
                registration => registration.id == args.id
            );
            collection[index].firstName = args.firstName;
            collection[index].lastName = args.lastName;
            return collection[index];
        }
    }
};

module.exports.Resolvers = resolvers;