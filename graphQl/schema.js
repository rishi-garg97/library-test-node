// schema.js

const schema = `
# registration type
type Registration {
    id: ID!
    firstName: String
    lastName: String
}
type Query {
    # Return a registration by id
    Registration(id: ID!): Registration
    # Return all registrations
    Registrations(limit: Int): [Registration]
}
type Mutation {
    # Create a registration
    createRegistration (firstName: String,lastName: String): Registration
    # Update a registration
    updateRegistration (id: ID!, firstName: String,lastName: String): Registration
    # Delete a registration
    deleteRegistration(id: ID!): Registration
}
`;

module.exports.Schema = schema;