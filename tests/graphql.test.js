// Imports
const chai = require("chai");
const expect = chai.expect;
const url = `http://63.35.1.138:8090/graphql`;
const request = require("supertest")(url);

// Variables for login token and created employee id
let token;
let employeeId;

describe("GraphQL check queries and mutations", () => {
  it("Check if signup endpoint working", done => {
    request
      .post("/graphql")
      .send({
        query: ` mutation {
                    signup(
                    name: "test", 
                    email:"test@test.com",
                    password:"testtest"
                    ) {
                    id
                    }
                }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.signup) {
          done();
        }
      });
  });

  it("Check if signin endpoint is working", done => {
    request
      .post("/graphql")
      .send({
        query: ` query{
                    userLogin(
                      email:"test@test.com",
                      password:"testtest") {
                      id,
                      token
                    }
                  }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.userLogin) {
          token = res.body.data.userLogin.token;
          done();
        }
      });
  });

  it("Check if employee create endpoint is working", done => {
    request
      .post("/graphql")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        query: ` mutation {
                    createEmployee(
                        name: "employee test", 
                        email:"employee@employee.com",
                        location:"designer", 
                        department:"designer",
                        imageUrl:"http://google.com"
                      ) {
                        _id,
                        name,
                        email,
                        location,
                        department,
                        imageUrl,
                        createdAt
                      }
                    }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.createEmployee) {
          employeeId = res.body.data.createEmployee._id;
          done();
        }
      });
  });

  it("Check if employee update endpoint is working", done => {
    request
      .post("/graphql")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        query: ` mutation {
                    updateEmployee(
                        id:"${employeeId}",
                        name: "employee test", 
                        email:"employee@employee.com",
                        location:"designer", 
                        department:"designer",
                        imageUrl:"http://google.com"
                      ) {
                        _id,
                        name,
                        email,
                        location,
                        department,
                        imageUrl,
                        createdAt
                      }
                    }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.updateEmployee) {
          done();
        }
      });
  });
  it("Check if employees list endpoint working", done => {
    request
      .post("/graphql")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        query: ` query {
            employees(page:1){
              employeesList{
                  _id,
                  name,
                  location,
                  department
              },
              totalEmployees
            }
          }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.employees.employeesList) done();
      });
  });
  it("Check if employee delete endpoint is working", done => {
    request
      .post("/graphql")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .send({
        query: `  mutation {
                    remove(id: "${employeeId}"){
                        _id
                    }
                  }
        `
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.data.remove) {
          done();
        }
      });
  });
});
