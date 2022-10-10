const router = require('express').Router();

const {
	createUser,
	getUsers,
	getById,
	deleteOneUser,
	addFriend,
	deleteFriend,
	updateUser,
} = require('../../controllers/userControllers');

//Get full user list or Create a new user
// /api/user/
router.route('/').get(getUsers);

//Create a User
// /api/user/create
router.route('/create').post(createUser);

//Get one user by id or Delete one user
// /api/users/id
router.route('/:id').get(getById).delete(deleteOneUser).put(updateUser);

//Add/delete a friend to a user
router.route('/:userId/friends/:friendId').put(addFriend).delete(deleteFriend);

module.exports = router;
