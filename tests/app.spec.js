const { expect } = require("chai");
const User = require("../model/user");
const app = require("../app");
const request = require("supertest");

describe("/api", () => {
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
  describe("/users/:_id", () => {
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
    it("finds one user by id from the database", () => {
      return request(app)
        .get("/api/users/5ec4f809549d6c5123c50a83")
        .expect(200)
        .then(({ body: { user } }) => {
          console.log(user);
          //   expect(user).to.eql({
          //     _id: "5ec4f809549d6c5123c50a83",
          //     name: "Niels2103456",
          //   });
        });
    });
  });
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
});
