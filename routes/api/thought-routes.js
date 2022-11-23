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

//Home Route (GET) at: /api/thoughts
router.route('/').get(getThoughts);

//Thought ID Route (GET, PUT, DELETE) at: /api/thoughts/:id
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

//Thought Post Route Using friendID as a Parameter at: /api/thoughts/:userId
router.route('/:userId').post(createThought);

//Reaction Route (POST) at: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

//Reaction Route (DELETE) at: /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;