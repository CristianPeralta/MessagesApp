let User = require('../models/User');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();
let fs = require('fs');

chai.use(chaiHttp);

describe('User',()=>{

    before((done)=>{

        done();
    })

    beforeEach((done)=>{
        User.remove({},(err)=>{
            done();
        });
    });

    describe('', () => {

        it('it should CREATE a new user',(done)=>{

            let user = {
                name: 'UserTest'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('name');
                    done();
                });
        });

        it('it should GET current user', (done) => {

            let user = {
                name: 'UserTest'
            };

            chai.request(server)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('name');
                    done();
                });
        });
    })
})
//TDD
'use strict'
let chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);
chai.should();
let expect = chai.expect;
let _ = require('underscore');

describe('User module', () => {

    beforeEach(function(done){
        User.remove({},(err) => {
            done();
        });
    })

    describe("save",() => {
        it("it should export a function", () => {
            expect(User.getAllPositions).to.be.a('Function');
        });

        it("it should return a promise", () => {
            const usersSave = User.save();
            expect(usersSave.then).to.be.a('Function');
        });

        describe("with inserted rows", () => {
            beforeEach((done) => {

                let data = {
                    name: "UserTesting"
                }

                var user = new User(data);

                user.save(function(err){
                    done();
                })
            })
        })
    })
})
