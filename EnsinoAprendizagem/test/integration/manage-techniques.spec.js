process.env.NODE_ENV = 'test';

const Tecnica     = require('../../app/models/Tecnica');
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

describe('Techniques', function(){

  describe('when no token is provided', function(){
    beforeEach((done) => {
      Tecnica.remove({}, (err) => {
        done();
      });
    });
    it('cannot show techniques', function(done){
      chai.request(server)
      .get('/api/techniques')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

    it('cannot create techniques', function(done){
      chai.request(server)
      .post('/api/techniques')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

    it('cannot update techniques', function(done){
      chai.request(server)
      .put('/api/techniques/1')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

    it('cannot delete techniques', function(done){
      chai.request(server)
      .delete('/api/techniques/1')
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
        return User.create([data.professor, data.psicologo_escolar, data.psicologo_escolar2, data.psicologo_educacional]);
      })
      .then(users => {
        data.professor._id              = users[0]._id;
        data.psicologo_escolar._id      = users[1]._id;
        data.psicologo_escolar2._id     = users[2]._id;
        data.psicologo_educacional._id  = users[3]._id;

        data.professor.token              = authService.signToken(data.professor).token;
        data.psicologo_escolar.token      = authService.signToken(data.psicologo_escolar).token;
        data.psicologo_escolar2.token     = authService.signToken(data.psicologo_escolar2).token;
        data.psicologo_educacional.token  = authService.signToken(data.psicologo_educacional).token;
      });
    });


    beforeEach((done) => {
      Tecnica.remove({}, (err) => {
        done();
      });
    });

    describe('GET/', function(){
      it('should be allowed to professor',  function(done){
        chai.request(server)
        .get('/api/techniques')
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
        .get('/api/techniques')
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
        .get('/api/techniques')
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
        .post('/api/techniques')
        .set('Authorization', 'Bearer ' + data.professor.token)
        .send()
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .post('/api/techniques')
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .send(data.tecnica1)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should not allow invalid techniques', function(done){
        chai.request(server)
        .post('/api/techniques')
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .send(data.invalid_technique)
        .end((err, res) => {
            res.should.have.status(422);
          done()
        });
      });

      it('should allow a valid technique', function(done){
        data.tecnica1.psychologist = data.psicologo_escolar._id;

        chai.request(server)
        .post('/api/techniques')
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .send(data.tecnica1)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
          done()
        });
      });

    });

    describe('GET/:id', function(){
      it('should not be allowed to professor',  function(done){
        chai.request(server)
        .get(`/api/techniques/${data.tecnica1._id}`)
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .get(`/api/techniques/${data.tecnica1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should return 404 when technique doesn\'t exist',  function(done){
        chai.request(server)
        .get(`/api/techniques/9999999`)
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) => {
            res.should.have.status(404);
          done();
        });
      });

      it('should return specified technique', function(done){
        data.tecnica1.psychologist = data.psicologo_escolar._id;
        Tecnica.create(data.tecnica1)
        .then(tecnica => {
          chai.request(server)
          .get(`/api/techniques/${tecnica._id}`)
          .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id').eql(tecnica.id);
            done();
          });
        })
      });

    });

    describe('PUT/:id', function(){
      it('should not be allowed to professor',  function(done){
        chai.request(server)
        .put(`/api/techniques/${data.tecnica1._id}`)
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .put(`/api/techniques/${data.tecnica1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should return 404 when technique doesn\'t exist',  function(done){
        chai.request(server)
        .put(`/api/techniques/9999999`)
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) => {
            res.should.have.status(404);
          done();
        });
      });

      it('should only allow the psychologist to edit',  function(done){
        data.tecnica1.psychologist = data.psicologo_escolar._id;
        Tecnica.create(data.tecnica1)
        .then(tecnica => {
          chai.request(server)
          .put(`/api/techniques/${tecnica._id}`)
          .set('Authorization', 'Bearer ' + data.psicologo_escolar2.token)
          .end((err, res) => {
              res.should.have.status(403);
            done();
          });
        })
      });

      it('should update specified technique', function(done){
        data.tecnica1.psychologist = data.psicologo_escolar._id;
        Tecnica.create(data.tecnica1)
        .then(tecnica => {
          chai.request(server)
          .put(`/api/techniques/${tecnica._id}`)
          .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
          .send({name: 'new name'})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Technique successfully edited.');
            done();
          });
        })
      });

    });

    describe('DELETE/:id', function(){
      it('should not be allowed to professor',  function(done){
        chai.request(server)
        .delete(`/api/techniques/${data.tecnica1._id}`)
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .delete(`/api/techniques/${data.tecnica1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should return 404 when technique doesn\'t exist',  function(done){
        chai.request(server)
        .delete(`/api/techniques/9999999`)
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) => {
            res.should.have.status(404);
          done();
        });
      });

      it('should only allow the psychologist to delete',  function(done){
        data.tecnica1.psychologist = data.psicologo_escolar._id;
        Tecnica.create(data.tecnica1)
        .then(tecnica => {
          chai.request(server)
          .delete(`/api/techniques/${tecnica._id}`)
          .set('Authorization', 'Bearer ' + data.psicologo_escolar2.token)
          .end((err, res) => {
              res.should.have.status(403);
            done();
          });
        })
      });

      it('should delete specified technique', function(done){
        data.tecnica1.psychologist = data.psicologo_escolar._id;
        Tecnica.create(data.tecnica1)
        .then(tecnica => {
          chai.request(server)
          .delete(`/api/techniques/${tecnica._id}`)
          .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Technique successfully deleted.');
            done();
          });
        })
      });

    });

  });

});
