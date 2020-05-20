const usersRouter = require('express').Router();
//const sendUserById = require('../controllers/users')


usersRouter.route('/users/:_id')
    .get(() => {
        console.log('in router')
    })


module.exports = usersRouter;