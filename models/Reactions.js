const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			max_length: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

// reactionSchema.virtual('timestamp').get(function () {
// 	const date = this.date;
// 	const options = {
// 		year: 'numeric',
// 		month: 'short',
// 		day: 'numeric',
// 		hour: 'numeric',
// 		minute: 'numeric',
// 	};
// 	return new Date(date).toLocaleDateString('us-en', options);
// });

const Reactions = model('reaction', reactionSchema);

module.exports = Reactions;
