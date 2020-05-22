const { expect } = require("chai");
const User = require("../model/user");
const app = require("../app");
const request = require("supertest");

describe("/api", () => {
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
  describe("/users/create_user", () => {
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
  describe('/pickup', () => {
    it.only('GET - gets all data from the database in the correct format, from the last hour', () => {
      return request(app)
        .get("/api/pickup")
        .expect(200)
        .then(({ body: { pickup } }) => {
          expect(pickup).to.be.an('array')
        });
    });
    it('POST - saves new data to database', () => {
      return request(app)
        .post('/api/pickup')
        .send({lat:3.33333, long:54.555})
        .expect(200)
        .then(({body:{pickup}}) => {
          expect(pickup._doc.lat).to.eql(3.33333)
          expect(pickup._doc.long).to.eql(54.555)
        })
    })
    // it.only('accepts a query for a type and returns data for only that type', () => {
    //     return request(app)
    //       .get('/api/data?topic=closing')
    //       .expect(200)
    //       .then(({body:{data}}) => {
    //         expect(data.length).to.equal(8)
    //       })
    // })
  })
  describe.only('/pickup/hour', () => {
    it('GET - gets all pickups from past hour', () => {
      return request(app)
        .get("/api/pickup/hour")
        .expect(200)
        .then(({ body: { pickup } }) => {
          expect(pickup).to.be.an('array')
        });
    })
  })
  describe('/marker', () => {
    it('GET - gets all markers from the database in the correct format', () => {
      return request(app)
        .get("/api/marker")
        .expect(200)
        .then(({ body: { marker } }) => {
          expect(marker).to.be.an('array')
        });
    });
    it('POST - saves new markers to database', () => {
      return request(app)
        .post('/api/marker')
        .send({lat:5.33333, long:43.555, type: 'closing'})
        .expect(200)
        .then(({body:{marker}}) => {
          expect(marker._doc.lat).to.eql(5.33333)
          expect(marker._doc.long).to.eql(43.555)
          expect(marker._doc.type).to.eql('closing')
        })
    })
  })
});
