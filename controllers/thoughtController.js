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
        Thought.findOne(
            { _id: params.id }
        )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No existing thoughts match this ID' });
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
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thought: _id } },
                    { new: true }
                )
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No existing users match this ID' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //UPDATE AN EXISTING THOUGHT -- PASS THE ID THROUGH AS A PARAM
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'No existing thoughts match this ID' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            })
    },

        //DELETE AN EXISTING THOUGHT -- PASS THE ID THROUGH AS A PARAM
        deleteThought({ params }, res) {
    Thought.findOneAndDelete(
        { _id: params.id }
    )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No existing thoughts match this ID' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
},

//CREATE A NEW REACTION
createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true },
    )
        .populate(
            {
                path: 'reactions',
                select: '-__v'
            }
        )
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No existing thoughts match this ID' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
},

//DELETE AN EXISTING REACTION
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtID },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No existing thoughts match this ID' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
}
}

module.exports = thoughtsController;