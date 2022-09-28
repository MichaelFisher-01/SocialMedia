const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		min_length: 1,
		max_length: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	username: {
		type: String,
		required: true,
	},
	reactions: {
		type: Schema.Types.ObjectId,
		ref: 'reactions',
	},
});

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;
