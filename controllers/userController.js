const { Users, User } = require('../models');

const userContoller = {

    //CREATE A NEW USER
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },

    //FIND ALL USERS
    getUsers(req, res) {
        User.find({})
            //Get all thoughts for the user
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },

    //FIND ONE USER GIVEN THE ID AS A PARAM
    getOneUser({ params }, res) {
        User.findOne(
            { _id: params.id }
        )
            .populate({
                path: 'thoughts', select: '-__v'
            })
            .populate({
                path: 'friends', select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No existing user matches this ID' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },

    //UPDATE CURRENT USER GIVEN THE ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No existing user matches this ID' });
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },


    //DELETE A USER GIVEN THE ID
    deleteUser({params}, res){
        User.findOneAndDelete(
            {_id: params.id}
        )
        .then(userData => {
            if(!userData){
                res.status(404).json({ message: 'No existing user matches this ID' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },

    //ADD A FRIEND TO A USER
    addFriend({params}, res){
        User.findOneAndUpdate
    }

}