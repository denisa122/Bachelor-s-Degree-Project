const chai = require("chai");
const expect = chai.expect;

const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../server");
const jwt = require("jsonwebtoken");

let goalID;

describe("Goal Tests", () => {
  describe("Add daily goal and get today's goals workflow test", () => {
    it("Should register + login user, add goals, and then get today's goals", async () => {
      // Register user
      let user = {
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@email.com",
        password: "password",
      };
      chai
        .request(server)
        .post("/api/auth/register")
        .send(user)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.a("object");
          expect(res.body.error).to.be.equal(null);

          // Login the user
          chai
            .request(server)
            .post("/api/auth/login")
            .send({
              email: user.email,
              password: user.password,
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body.error).to.be.equal(null);

              let token = res.body.data.token;
              let decoded = jwt.decode(token);
              let userId = decoded.id;

              // Create goal
              let goal = {
                text: "Read a book",
                userID: userId,
              };

              // Add goal
              chai
                .request(server)
                .post("/api/goals")
                .set("auth-token", token)
                .send(goal)
                .end((err, res) => {
                  expect(res.status).to.equal(201);
                  expect(res.body).to.have.property("goalID");
                  expect(res.body.text).to.equal("Read a book");

                  goalID = res.body.goalID;

                  // Get today's goals
                  chai
                    .request(server)
                    .get("/api/goals/today")
                    .set("auth-token", token)
                    .end((err, res) => {
                      expect(res.status).to.equal(200);
                      expect(res.body).to.be.a("array");
                      expect(res.body).to.have.lengthOf(1);
                      expect(res.body[0].text).to.equal("Read a book");
                    });
                });
            });
        });
    });
  });
});
