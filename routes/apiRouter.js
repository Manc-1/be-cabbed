const apiRouter = require('express').Router();
const usersRouter =  require('./usersRouter')

apiRouter.use('/users', () => {
    console.log('in api router')
});

module.exports = apiRouter;