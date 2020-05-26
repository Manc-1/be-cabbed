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
        .expect(201)
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
    it("Responds with a statuscode 404, and a E-mail not found error message if the email key is not a correct value", () => {
      return request(app)
        .post("/api/users/login")
        .send({
          email: "abc2@testing.com",
          password: "testing22",
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("E-mail not found");
        });
    });
    it("Responds with a statuscode 400, and a bad request error message if a key is not correct", () => {
      return request(app)
        .post("/api/users/login")
        .send({
          email: "Test2@testing.com",
          password: "Password incorrect",
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Password incorrect");
        });
    });

    it("Responds with a statuscode 400, and a bad request error message if a key is not correct", () => {
      return request(app)
        .post("/api/users/login")
        .send({
          email: "Test2@testing.com",
          Thisisincorrect: "testing22",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Bad request");
        });
    });

    it("Responds with statuscode 405, and an error message when invalid request methods are used", () => {
      const invalidMethods = ["get", "patch", "delete", "put"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/users/login")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
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
          userAvatar:
            "https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg",
        })
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).to.contain.keys(
            "name",
            "email",
            "phonenumber",
            "password",
            "postCode",
            "userAvatar"
          );
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
    it("Returns a 400 error message when any required fields are missing", () => {
      return request(app)
        .post("/api/users/create_user")
        .send({
          name: "Niels",
          email: "Testasdas2@testing.com",
          phoneNumber: "077888888",
          userAvatar:
            "https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg",
        })
        .expect(400)
        .then(({ text }) => {
          expect(text).to.eql("Error while processing user entry to database");
        });
    });
    it("Responds with statuscode 405, and an error message when invalid request methods are used", () => {
      const invalidMethods = ["get", "patch", "delete", "put"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/users/create_user")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("/users/user_id/:_id", () => {
    it("finds one user by id from the database", () => {
      return request(app)
        .get("/api/users/user_id/5ec557933303033c03651588")
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
        .get("/api/users/user_id/5ec4f809549d6c5123c50a123INVALID")
        .expect(404)
        .then(({ text }) => {
          expect(text).to.equal("Id not found");
        });
    });
  });

  describe("/pickup", () => {
    it("GET - gets all data from the database in the correct format, from the last hour", () => {
      return request(app)
        .get("/api/pickup")
        .expect(200)
        .then(({ body: { pickup } }) => {
          expect(pickup).to.be.an("array");
          pickup.forEach(obj => {
            expect(obj).to.have.keys(['_id', 'date', 'time', "latitude", "longitude", "__v"])
          })
        });
    });
    it("POST - saves new data to database", () => {
      return request(app)
        .post("/api/pickup")
        .send({ latitude: 3.33333, longitude: 54.555 })
        .expect(200)
        .then(({ body: { pickup } }) => {
          expect(pickup.latitude).to.eql(3.33333);
          expect(pickup.longitude).to.eql(54.555);
        });
    });
    it("POST - Returns a 400 error message when required keys are not in post request", () => {
      return request(app)
        .post("/api/pickup")
        .send({ lab: 3.33333, long: 54.555 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Bad Request");
        });
    });
    it("POST - Returns error message when requiered value is not submitted in correct format", () => {
      return request(app)
        .post("/api/pickup")
        .send({ lat: "testingtest", long: 54.555 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Bad Request");
        });
    });
    it("Responds with statuscode 405, and an error message when invalid request methods are used", () => {
      const invalidMethods = ["patch", "delete", "put"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/pickup")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe.only("/pickup/hour", () => {
    it("GET - gets all pickups from past hour", () => {
      return request(app)
        .get("/api/pickup/hour")
        .expect(200)
        .then(({ body: { pickup } }) => {
          expect(pickup).to.be.an("array");
        });
    });
    it("GET - responds with a 404 when the path is incorrect", () => {
      return request(app)
        .get("/api/pickup/hourz")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Path not found");
        });
    });
    it("Responds with statuscode 405, and an error message when invalid request methods are used", () => {
      const invalidMethods = ["post", "patch", "delete", "put"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/pickup/hour")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("/marker", () => {
    it("GET - gets all markers from the database in the correct format", () => {
      return request(app)
        .get("/api/marker")
        .expect(200)
        .then(({ body: { marker } }) => {
          expect(marker).to.be.an("array");
          marker.forEach(obj => {
            expect(obj).to.have.keys(['_id', 'date', 'time', "__v", "latitude", "longitude", 'type'])
          })
        });
    });
    it("POST - saves new markers to database", () => {
      return request(app)
        .post("/api/marker")
        .send({ latitude: 6.35333, longitude: 33.535, type: "police" })
        .expect(200)
        .then(({ body: { marker } }) => {
          expect(marker.latitude).to.eql(6.35333);
          expect(marker.longitude).to.eql(33.535);
          expect(marker.type).to.eql("police");
          expect(marker).to.have.keys([
            "_id",
            "date",
            "time",
            "__v",
            "latitude",
            "longitude",
            "type",
          ]);
        });
    });
    it("POST - Returns a 400 error message when required keys are not in post request", () => {
      return request(app)
        .post("/api/marker")
        .send({ lat: 6.35333, long: 33.535, typez: "police" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Bad request");
        });
    });
    it("POST - Returns error message when requiered value is not submitted in correct format", () => {
      return request(app)
        .post("/api/marker")
        .send({ lat: 6.35333, long: "av", type: "police" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Bad request");
        });
    });
    it("Responds with statuscode 405, and an error message when invalid request methods are used", () => {
      const invalidMethods = ["patch", "delete", "put"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/marker")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal("Method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    describe("/marker/hour", () => {
      it("GET - gets all markers from past hour", () => {
        return request(app)
          .get("/api/marker/hour")
          .expect(200)
          .then(({ body: { marker } }) => {
            expect(marker).to.be.an("array");
          });
      });
      it("Responds with statuscode 405, and an error message when invalid request methods are used", () => {
        const invalidMethods = ["post", "patch", "delete", "put"];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]("/api/marker/hour")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal("Method not allowed");
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
});


