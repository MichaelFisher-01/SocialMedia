const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'thoughts',
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		versionKey: false,
		id: false,
	}
);

userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const Users = model('user', userSchema);

module.exports = Users;
