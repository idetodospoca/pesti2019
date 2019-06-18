process.env.NODE_ENV = 'test';

const Atributos   = require('../../app/models/AtributosPossiveis');
const User        = require('../../app/models/User');
const chai        = require('chai');
const chaiHttp    = require('chai-http');
const server      = require('../../server');
const expect      = chai.expect;
const moment      = require('moment');
const authService = require('../../app/api/auth/auth.service');

let should        = chai.should();
let data          = require('../data.json');

chai.use(chaiHttp);

describe('Attributes', function(){

  describe('when no token is provided', function(){
    beforeEach((done) => {
      Atributos.remove({}, (err) => {
        done();
      });
    });
    it('cannot show attributes', function(done){
      chai.request(server)
      .get('/api/attributes')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

    it('cannot create attributes', function(done){
      chai.request(server)
      .post('/api/attributes')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

  });

  describe('when a token is provided', function(){
    before(function(){
      return User.remove({})
      .then(() => {
        return User.create([data.professor, data.psicologo_escolar, data.psicologo_educacional]);
      })
      .then(users => {
        data.professor._id              = users[0]._id;
        data.psicologo_escolar._id      = users[1]._id;
        data.psicologo_educacional._id  = users[2]._id;

        data.professor.token              = authService.signToken(data.professor).token;
        data.psicologo_escolar.token      = authService.signToken(data.psicologo_escolar).token;
        data.psicologo_educacional.token  = authService.signToken(data.psicologo_educacional).token;
      });
    });


    beforeEach((done) => {
      Atributos.remove({}, (err) => {
        done();
      });
    });

    describe('GET/', function(){
      it('should be allowed to professor',  function(done){
        chai.request(server)
        .get('/api/attributes')
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
      });

      it('should be allowed to psicologo_escolar',  function(done){
        chai.request(server)
        .get('/api/attributes')
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
      });

      it('should be allowed to psicologo_educacional',  function(done){
        chai.request(server)
        .get('/api/attributes')
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
      });
    });

    describe('POST/', function(){
      it('should not be allowed to professor',  function(done){
        chai.request(server)
        .post('/api/attributes')
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo escolar',  function(done){
        chai.request(server)
        .post('/api/attributes')
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should not allow invalid attributes', function(done){
        chai.request(server)
        .post('/api/attributes')
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .send(data.invalid_attributes)
        .end((err, res) => {
            res.should.have.status(422);
          done()
        });
      });

      it('should allow valid attributes', function(done){
        data.attributes.psychologist = data.psicologo_educacional._id;

        chai.request(server)
        .post('/api/attributes')
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .send(data.attributes)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
          done()
        });
      });

    });


  });

});
