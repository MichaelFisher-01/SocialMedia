const router = require('express').Router();
const {
	createThought,
	getThoughts,
	getThoughtById,
	updateThought,
	addReaction,
	deleteReaction,
	deleteOneThought,
} = require('../../controllers/thoughtController');

//Get full user list or Create a new user
// /api/thoughts/
router.route('/').get(getThoughts);

//Create a User
// /api/thoughts/create
router.route('/create').post(createThought);

//Get one user by id or Delete one user
// /api/thoughts/thoughId
router
	.route('/:thoughtId')
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteOneThought);

//Create a reation add it to a thought
// api/thoughts/thoughtid/reaction
router.route('/:thoughtId/reaction').post(addReaction);

//Delete an already created reaction
// api/thoughts/thoughtId/reaction/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
