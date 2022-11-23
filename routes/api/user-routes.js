const router = require('express').Router();

const {
    createUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

//Home Route (GET, POST) at: /api/users
router.route('/').get(getUsers).post(createUser);

//User ID Route (GET, PUT, DELETE) at: /api/users/:id
router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

//FRIEND ID ROUTE (POST, DELETE) at: /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;