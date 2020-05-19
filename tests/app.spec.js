const expect = require('chai');
const User = require('../model/user');

describe('', () => {
    describe('Saving new users', (done) => {
        it('saves a new user to the database', () => {
            const user = new User({
                name:'joanna',
                password:'password123'
            })
            user.save().then(() => {
                expect(user.isNew).to.equal(false)
            done();
            })
        })
    })
})