const { model, Schema, ObjectId } = require('mongoose');
const Landmark = require('./landmark-model').schema;

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
        sortDirection: {
			type: Number, 
			required: true
		},
        landmarks:[Landmark],
        child:[ObjectId]
    },
    { timestamps: true }
);

const Region = model('Region',region);
module.exports = Region;