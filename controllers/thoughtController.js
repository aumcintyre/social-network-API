const { User, Thought } = require('../models');

//Creating a 'thoughts controller' to handle all CRUD operations for this model
const thoughtsController = {
    
    //GET ALL THOUGHTS
    getThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    //GET ONE THOUGHT BY ID
    getOneThought(req, res) {
        Thought.findOne({
            _id: params.id
        })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'No existing thoughts match this ID'});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //CREATE A NEW THOUGHT
    createThought({ body }, res){
        Thought.create(body)
        .then(thoughtData => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData._id }},
                { new: true }
            )
            .then(userData => {
                res.status(404).json({ message: 'No existing users match this ID'})
            })
        })
    }
}