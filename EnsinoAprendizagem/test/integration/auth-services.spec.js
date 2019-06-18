process.env.NODE_ENV = 'test';

const User     = require('../../app/models/User');
const chai     = require('chai');
const chaiHttp = require('chai-http');
const server   = require('../../server');
const expect   = chai.expect;
const mongoose = require('mongoose');
const assert   = require('assert');


chai.use(chaiHttp);

describe('Users', function() {
    let user = {
        email: 'psicologo_educacional@learning-techniques.com',
        password: 'password1@',
        name: 'psicologo_educacional',
        role: 'psicologo_educacional'
    };

    before(function() { //Before each test we empty the database
        return User.remove({}).exec();
    });

    /*
    * Test Register New User
    */
    describe('POST /register', function() {
        it('should register users', function(done){
            chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end(function(err, res){
                expect(err).to.be.null;

                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('expirationDate');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('role');

                //Verify if an user was actually created
                User.find()
                .then((users) => {
                    assert.equal(1, users.length);
                    done();
                });
            });
        });
    });

    /*
    * Test Login
    */
    describe('POST /login', function(){
        it('should be possible to login and get a token', function(done){
            chai.request(server)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: user.password
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('expirationDate');
                done();
            });
        });
    });
});
