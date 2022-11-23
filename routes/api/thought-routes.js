const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//Home Route (GET, POST) at: /api/thoughts
router.route('/').get(getThoughts);

//User ID Route (GET, PUT, DELETE) at: /api/users/:id
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

//FRIEND ID ROUTE (POST, DELETE) at: /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;