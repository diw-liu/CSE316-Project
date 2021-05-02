const { model, Schema, ObjectId } = require('mongoose');

const subregion = new Schema(
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
        landmarks:[String]
    },
    { timestamps: true }
);

const Subregion = model('Subregion', subregion);
module.exports = Subregion;