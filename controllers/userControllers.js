const { Users } = require('../models');

module.exports = {
	//Create
	createUser(req, res) {
		Users.create(req.body)
			.then((user) => res.json(user))
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
	//Read
	getUsers(req, res) {
		Users.find({})
			.then((users) => res.json(users))
			.catch((error) => res.status(500).json(error));
	},

	getById(req, res) {
		Users.find({ _id: req.params.id })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user found with that id' })
					: res.json(user)
			)
			.catch((error) => res.status(500).json(error));
	},

	//Update
	addFriend(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $push: { friends: req.params.friendId } }
		).then((user) =>
			!user
				? res
						.status(404)
						.json({ message: 'Could not add friend user does not exist' })
				: res.json(user)
		);
	},

	deleteFriend(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } }
		).then((user) =>
			!user
				? res
						.status(404)
						.json({ message: 'Could not delete friend user does not exist' })
				: res.json(user)
		);
	},
	//Delete
	deleteOneUser(req, res) {
		Users.findOneAndDelete({ username: req.params.userName })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with that username' })
					: res.json(`Succesfully deleted: ${user}`)
			)
			.catch((error) => res.status(500).json(error));
	},
};
