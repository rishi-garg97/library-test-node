/**
 * Created by rgarg on 12-09-2019.
 */
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");

const bodyParser = require('body-parser');
const typeDefs = require("./graphQl/schema").Schema;
const resolvers = require("./graphQl/resolvers").Resolvers;
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: {
        log: e => console.log(e)
    }
});

const app = express();




app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(
    "/graphql",
    graphqlHTTP(request => ({
        schema: schema,
        graphiql: true
    }))
);

app.use(express.static('public'));

app.listen(8080, function() {
    console.log("server started on port 8080");
});

