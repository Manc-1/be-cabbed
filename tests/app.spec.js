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
  describe("/users/login", () => {
    it("Check if user excist in database and confirm by sending user object", () => {
      return request(app)
        .post("/api/users/login")
        .send({
          name: "Test2",
          password: "testing22",
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.eql({
            _id: "5ec53aa45d42141d25c16a95",
            name: "Test2",
            password: null,
            __v: 0,
          });
        });
    });
  });
  describe("/users/create_user", () => {
    it("Posts a new user to the database and returns the user object", () => {
      return request(app)
        .post("/api/users/create_user")
        .send({
          name: "Niels2103456",
          password: "testing22",
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user.name).to.eql("Niels2103456");
          expect(user.password).to.eql(null);
        });
    });
  });
  describe.only("/users/:_id", () => {
    it("finds one user by id from the database", () => {
      return request(app)
        .get("/api/users/5ec53aa45d42141d25c16a95")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.eql({
            _id: "5ec53aa45d42141d25c16a95",
            name: "Test2",
            password: null,
            __v: 0,
          });
        });
    });
    it("Returns an error code when de user id does not exist", () => {
      return request(app)
        .get("/api/users/5ec4f809549d6c5123c50a123INVALID")
        .expect(404)
        .then(({ text }) => {
          expect(text).to.equal("Id not found");
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
