const {expect} = require('chai');
const User = require('../model/user');
const app =  require('../app');
const request = require('supertest');

describe('/api', () => {
    // describe('Saving new users', (done) => {
    //     it('saves a new user to the database', () => {
    //         const user = new User({
    //             name:'joanna',
    //             password:'password123'
    //         })
    //         user.save().then(() => {
    //             expect(user.isNew).to.equal(false)
    //         done();
    //         })
    //     })
    // })
    describe('/users/:_id', () => {
        // beforeEach((done) => {
        //     const user = new User({
        //         name:'joanna',
        //         password:'password123'
        //     })
        //     user.save().then(() => {
        //     done();
        //     })
        // })
        // it('gets one user by name from the database', (done) => {
        //     User.findOne({name: 'joanna'}).then((res) => {
        //         expect(res.name).to.equal('joanna')
        //         done();
        //     })
        // })
        it('finds one user by id from the database', () => {
            return request(app)
                .get('/api/users/5ec3a4e4f7294931021ef259')
                .expect(200)
                .then((res) => {
                    console.log(res)
                })
            // User.findOne({_id: user._id}).then((res) => {
            //     expect(res._id).to.eql(user._id)
            //     done();
            // })
        })
    })
    // describe('delete user', () => {
    //     beforeEach((done) => {
    //         const user = new User({
    //             name:'joanna',
    //             password:'password123'
    //         })
    //         user.save().then(() => {
    //         done();
    //         })
    //     })
    //     it('deletes user from database', () => {
    //         User.findOneAndRemove({name:'joanna'}).then(() => {
    //             User.findOne({name:'joanna'}).then((res) => {
    //                 expect(res).to.equal(null)
    //                 done()
    //             })
    //         })
    //     })
    // })
})