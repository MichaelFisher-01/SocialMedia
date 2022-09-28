const { Users } = require('../models');

module.exports = {
	//Create
	createUser(req, res) {
		console.log(req.body);
		Users.create(req.body)
			.then((user) => res.json(user))
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
	//Read
	getUsers(req, res) {
		Users.find()
			.then((users) => res.json(users))
			.catch((error) => res.status(500).json(error));
	},

	getOneUser(req, res) {
		Users.findOne({ username: req.params.userName })
			.select('-__v')
			.then((user) =>
				!user
					? res
							.status(404)
							.json({ message: 'No users found with that username' })
					: res.json(user)
			)
			.catch((error) => res.status(500).json(error));
	},

	//Update

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
