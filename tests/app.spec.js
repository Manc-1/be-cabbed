const {expect} = require('chai');
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
    describe('finding users', () => {
        beforeEach((done) => {
            const user = new User({
                name:'joanna',
                password:'password123'
            })
            user.save().then(() => {
            done();
            })
        })
        it('finds one user by name from the database', (done) => {
            User.findOne({name: 'joanna'}).then((res) => {
                expect(res.name).to.equal('joanna')
                done();
            })
        })
        it('finds one user by id from the database', (done) => {
            User.findOne({_id: user._id}).then((res) => {
                expect(res._id).to.eql(user._id)
                done();
            })
        })
    })
    describe('delete user', () => {
        beforeEach((done) => {
            const user = new User({
                name:'joanna',
                password:'password123'
            })
            user.save().then(() => {
            done();
            })
        })
        it('deletes user from database', () => {
            User.findOneAndRemove({name:'joanna'}).then(() => {
                User.findOne({name:'joanna'}).then((res) => {
                    expect(res).to.equal(null)
                })
            })
        })
    })
})