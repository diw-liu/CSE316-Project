const { model, Schema, ObjectId } = require('mongoose');

const LandmarkSchema = new Schema(
	{
        _id:{
			type: ObjectId,
			required: true
		},
		region:{
			type: String,
			required: true
		},
		name:{
			type: String,
			required: true
		}
	}
);

const Landmark = model('Landmark', LandmarkSchema);
module.exports = Landmark;