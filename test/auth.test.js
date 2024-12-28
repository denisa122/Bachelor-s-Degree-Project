const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../server");

describe("Register and Login Tests", () => {
  let registeredUser;

  it("Should register a new valid user", (done) => {
    let user = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@email.com",
      password: "password",
    };

    chai
      .request(server)
      .post("/api/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an("object");
        registeredUser = user;
        done();
      });
  });

  it("Should log in and then log out a user", () => {
    // Login
    chai
      .request(server)
      .post("/api/auth/login")
      .send({
        email: registeredUser.email,
        password: registeredUser.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.property("token");

        let authToken = res.body.data.token;

        // Logout
        chai
          .request(server)
          .post("/api/auth/logout")
          .set("auth-token", authToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body.message).to.equal("Logged out successfully!");

            done();
          });
      });
  });

  it("Should not log in an invalid user", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({
        email: "invalidemail@email.com",
        password: "invalidpassword",
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal("Incorrect email or password!");
        done();
      });
  });

  describe("Login status tests", () => {
    it("Should return isLoggedIn as false when no token is provided", (done) => {
      chai
        .request(server)
        .get("/api/auth/login-status")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("object");
          expect(res.body.isLoggedIn).to.be.false;
          done();
        });
    });
  });
});
