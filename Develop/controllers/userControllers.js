const { Users } = require('../models');

module.exports = {
	//Create
	createUser(req, res) {
		Users.create(req.body)
			.then((user) =>
				res.json({ message: `Successfully Created User`, userData: user })
			)
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
	//Read
	getUsers(req, res) {
		Users.find({})
			.populate({ path: 'friends', select: 'username' })
			.then((users) => res.json(users))
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	},

	getById(req, res) {
		Users.find({ _id: req.params.id })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user found with that id' })
					: res.json({
							message: `Displaying: ${req.params.id}`,
							userData: user,
					  })
			)
			.catch((error) => res.status(500).json(error));
	},

	//Update
	updateUser(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { username: req.body.username, email: req.body.email } },
			{ runValidators: true, new: true }
		).then((user) =>
			!user
				? res.status(404).json({ message: 'No user found for this update' })
				: res.json(user)
		);
	},

	addFriend(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $push: { friends: req.params.friendId } }
		).then((user) =>
			!user
				? res
						.status(404)
						.json({ message: 'Could not add friend user does not exist' })
				: res.json({
						message: `${user.username} added a new friend!`,
						userData: user,
				  })
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
				: res.json({
						message: `${user.username} removed a friend`,
						userData: user,
				  })
		);
	},
	//Delete
	deleteOneUser(req, res) {
		Users.findOneAndDelete({ _id: req.params.id })
			.then((user) =>
				!user
					? res.status(404).json({ message: 'No user with that username' })
					: res.json({ message: `Succesfully deleted User`, userDate: user })
			)
			.catch((error) => res.status(500).json(error));
	},
};
