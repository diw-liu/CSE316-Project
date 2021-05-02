const { model, Schema, ObjectId } = require('mongoose');
// const Subregion = require('./subregion-model').schema;

const region = new Schema(
    {
        _id:{
            type: ObjectId,
            required: true
        },
        owner:{
            type: String,
            required: true
        },
        parent:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        capital:{
            type: String,
            required: true
        },
        leader:{
            type: String,
            required: true
        },
        landmarks:[String],
        child:[ObjectId]
    },
    { timestamps: true }
);

const Region = model('Region',region);
module.exports =Region;