const { Thoughts, Users } = require('../models');

module.exports = {
	//Create
	createThought(req, res) {
		Thoughts.create(req.body)
			.then((thought) => {
				console.log(thought);
				!thought
					? res.status(404).json({ message: 'Unable to create new thought' })
					: Users.findOneAndUpdate(
							{ username: thought.username },
							{ $push: { thoughts: thought._id } },
							{ new: true }
					  ).then((user) => console.log(`Thought Added to: ${user}`));
				res.json(thought);
			})
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
	//Read
	getThoughts(req, res) {
		Thoughts.find({})
			.populate({ path: 'reactions', select: 'reactionBody' })
			.then((thoughts) => res.json(thoughts))
			.catch((error) => res.status(500).json(error));
	},

	getThoughtById(req, res) {
		Thoughts.find({ _id: req.params.thoughtId })
			.then((thought) => {
				!thought
					? res
							.status(404)
							.json({ message: 'There is no thought with that id' })
					: res.json({
							message: `Displaying: ${req.params.thoughtId}`,
							thoughtData: thought,
					  });
			})
			.catch((error) => res.status(500).json(error));
	},

	//Update
	updateThought(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: { thoughtText: req.body.thoughtText } },
			{ new: true }
		).then((thought) =>
			!thought
				? res.status(404).json({ message: 'Unable to locate thought' })
				: res.json(thought)
		);
	},

	addReaction(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } }
		).then((reaction) =>
			!reaction
				? res
						.status(404)
						.json({ message: 'Unable to locate thought based off provided id' })
				: res.json(reaction)
		);
	},

	//Delete
	deleteOneThought(req, res) {
		Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: 'There is no thought with that id' })
					: res.json({
							message: `Succesfully deleted: ${req.params.thoughtId}`,
							thoughtData: thought,
					  })
			)
			.catch((error) => res.status(500).json(error));
	},

	deleteReaction(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } }
		).then((reaction) =>
			!reaction
				? res
						.status(404)
						.json({ message: 'Unable to locate a reaction with provided Id' })
				: res.json({
						message: `Successfully deleted: ${req.params.reactionId}`,
						reactionData: reaction,
				  })
		);
	},
};
