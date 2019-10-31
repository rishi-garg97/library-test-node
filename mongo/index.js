/**
 * Created by rgarg on 07-10-2019.
 */
const _ = require("lodash");

let DB = null;

const getAll = () => {
    // return DB.collection('dynamicUser').find().toArray((err, items) => {
    //     return items;
    // })
}
const save = (args) => {
    console.log(args);
    let nextId;
    return DB.collection('dynamicUser').find().toArray((err, users) => {
        if (users.length === 0) {
            nextId = 1;
        } else {
            let maxIdUser = 1;
            _.each(users, function (user) {
                if (maxIdUser < user.id) {
                    maxIdUser = user.id;
                }
            })
            nextId = maxIdUser + 1;
        }
        args.id = nextId;
        DB.collection('dynamicUser').insertOne(args, (err, result) => {
        });
        // collection.push(args);
        return args;
    })
}

const update = () => {

}

const remove = (args) => {
    return DB.collection("dynamicUser").deleteOne({id: Number(args.id)}, (err, result) => {
        if (err) {
            return err;
        }
    });
}

module.exports = (dbConnection) => {
    DB = dbConnection;
    return {
        save: save,
        update: update,
        remove: remove,
        getAll: getAll
    }
}