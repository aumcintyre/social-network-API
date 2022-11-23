const { Users, User } = require('../models');

const userContoller = {

//CREATE A NEW USER
createUser({body}, res){
    User.create(body)
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400)
    })
}

}