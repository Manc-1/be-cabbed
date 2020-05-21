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
          email: "Test2@testing.com",
          password: "testing22",
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.eql({
            _id: "5ec557933303033c03651588",
            name: "Niels",
            password: null,
            email: "Test2@testing.com",
            phoneNumber: "077888888",
            postCode: "WA16 9QJ",
            __v: 0,
          });
        });
    });
  });
  describe.only("/users/create_user", () => {
    it("Posts a new user to the database and returns the user object", () => {
      return request(app)
        .post("/api/users/create_user")
        .send({
          name: "Niels",
          email: "Test22@testing.com",
          phoneNumber: "077888888",
          password: "testing22",
          postCode: "WA16 9QJ",
          UserAvatar:
            "https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg",
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user.name).to.eql("Niels");
          expect(user.password).to.eql(null);
          expect(user.postCode).to.eql("WA16 9QJ");
        });
    });
    it("Returns a 400 error message when e-mail is already in database", () => {
      return request(app)
        .post("/api/users/create_user")
        .send({
          name: "Niels",
          email: "Test2@testing.com",
          phoneNumber: "077888888",
          password: "testing22",
          postCode: "WA16 9QJ",
          UserAvatar:
            "https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg",
        })
        .expect(400)
        .then(({ text }) => {
          expect(text).to.eql("E-mail adress is already taken");
        });
    });
  });
  describe("/users/:_id", () => {
    it("finds one user by id from the database", () => {
      return request(app)
        .get("/api/users/5ec557933303033c03651588")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.eql({
            _id: "5ec557933303033c03651588",
            name: "Niels",
            email: "Test2@testing.com",
            password: null,
            postCode: "WA16 9QJ",
            phoneNumber: "077888888",
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
