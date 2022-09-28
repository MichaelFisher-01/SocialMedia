const router = require('express').Router();

const {
	createUser,
	getUsers,
	getOneUser,
	deleteOneUser,
} = require('../../controllers/userControllers');

//Get full user list or Create a new user
// /api/user/
router.route('/').get(getUsers);

//Create a User
// /api/user/create
router.route('/create').post(createUser);

//Get one user or Delete one user
router.route('/:userName').get(getOneUser).delete(deleteOneUser);

module.exports = router;
