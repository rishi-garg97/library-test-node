const Entity = require('../models/entity.model');

const create = (args) => {
    console.log(args);
    let entity = new Entity(args);
    entity.save(function (err) {
        if (err) {
            return err;
        }
        console.log('Entity Created successfully');
        // res.send('Entity Created successfully');
    })
};

const getData = () => {
    return Entity.find({}, function (err, data) {
        return data;
    });
}

const remove = (args) => {
    return Entity.remove({_id: args.id}, (err, data) => {
        return data;
    });
}
module.exports = (DB) => {
    db = DB;
    return {
        create: create,
        delete: remove,
        getData: getData
    }
}