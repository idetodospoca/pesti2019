process.env.NODE_ENV = 'test';

const Projeto     = require('../../app/models/Projeto');
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

describe('Projects', function(){

  describe('when no token is provided', function(){
    beforeEach((done) => {
      Projeto.remove({}, (err) => {
        done();
      });
    });
    it('can show projects', function(done){
      chai.request(server)
      .get('/api/projects')
      .send()
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    });

    it('cannot create projects', function(done){
      chai.request(server)
      .post('/api/projects')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

    it('cannot update projects', function(done){
      chai.request(server)
      .put('/api/projects/1')
      .send()
      .end((err, res) => {
          res.should.have.status(401);
        done();
      });
    });

    it('cannot delete projects', function(done){
      chai.request(server)
      .delete('/api/projects/1')
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
        return User.create([data.professor, data.professor2, data.psicologo_escolar, data.psicologo_educacional]);
      })
      .then(users => {
        data.professor._id              = users[0]._id;
        data.professor2._id             = users[1]._id;
        data.psicologo_escolar._id      = users[2]._id;
        data.psicologo_educacional._id  = users[3]._id;

        data.professor.token              = authService.signToken(data.professor).token;
        data.professor2.token             = authService.signToken(data.professor2).token;
        data.psicologo_escolar.token      = authService.signToken(data.psicologo_escolar).token;
        data.psicologo_educacional.token  = authService.signToken(data.psicologo_educacional).token;
      });
    });


    beforeEach((done) => {
      Projeto.remove({}, (err) => {
        done();
      });
    });

    describe('POST/', function(){
      it('should not be allowed to psicologo escolar',  function(done){
        chai.request(server)
        .post('/api/projects')
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .send()
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .post('/api/projects')
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .send(data.projeto1)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should not allow invalid projects', function(done){
        chai.request(server)
        .post('/api/projects')
        .set('Authorization', 'Bearer ' + data.professor.token)
        .send(data.invalid_project)
        .end((err, res) => {
            res.should.have.status(422);
          done()
        });
      });

      it('should allow a valid project', function(done){
        data.projeto1.project_manager = data.professor._id;

        chai.request(server)
        .post('/api/projects')
        .set('Authorization', 'Bearer ' + data.professor.token)
        .send(data.projeto1)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
          done()
        });
      });

    });

    describe('GET/:id', function(){
      it('should not be allowed to psicologo escolar',  function(done){
        chai.request(server)
        .get(`/api/projects/${data.projeto1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .get(`/api/projects/${data.projeto1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should return 404 when project doesn\'t exist',  function(done){
        chai.request(server)
        .get(`/api/projects/9999999`)
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) => {
            res.should.have.status(404);
          done();
        });
      });

      it('should return specified project', function(done){
        data.projeto1.project_manager = data.professor._id;
        Projeto.create(data.projeto1)
        .then(projeto => {
          chai.request(server)
          .get(`/api/projects/${projeto._id}`)
          .set('Authorization', 'Bearer ' + data.professor.token)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id').eql(projeto.id);
            done();
          });
        })
      });

    });

    describe('PUT/:id', function(){
      it('should not be allowed to psicologo escolar',  function(done){
        chai.request(server)
        .put(`/api/projects/${data.projeto1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .put(`/api/projects/${data.projeto1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should return 404 when project doesn\'t exist',  function(done){
        chai.request(server)
        .put(`/api/projects/9999999`)
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) => {
            res.should.have.status(404);
          done();
        });
      });

      it('should only allow the project_manager or invited teachers to edit',  function(done){
        data.projeto1.project_manager = data.professor._id;
        Projeto.create(data.projeto1)
        .then(projeto => {
          chai.request(server)
          .put(`/api/projects/${projeto._id}`)
          .set('Authorization', 'Bearer ' + data.professor2.token)
          .end((err, res) => {
              res.should.have.status(403);
            done();
          });
        })
      });

      it('should update specified project', function(done){
        data.projeto1.project_manager = data.professor._id;
        Projeto.create(data.projeto1)
        .then(projeto => {
          chai.request(server)
          .put(`/api/projects/${projeto._id}`)
          .set('Authorization', 'Bearer ' + data.professor.token)
          .send({name: 'new name'})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Project successfully edited.');
            done();
          });
        })
      });

    });

    describe('DELETE/:id', function(){
      it('should not be allowed to psicologo escolar',  function(done){
        chai.request(server)
        .delete(`/api/projects/${data.projeto1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_escolar.token)
        .end((err, res) =>{
            res.should.have.status(403);
          done();
        });
      });

      it('should not be allowed to psicologo educacional',  function(done){
        chai.request(server)
        .delete(`/api/projects/${data.projeto1._id}`)
        .set('Authorization', 'Bearer ' + data.psicologo_educacional.token)
        .end((err, res) => {
            res.should.have.status(403);
          done();
        });
      });

      it('should return 404 when project doesn\'t exist',  function(done){
        chai.request(server)
        .delete(`/api/projects/9999999`)
        .set('Authorization', 'Bearer ' + data.professor.token)
        .end((err, res) => {
            res.should.have.status(404);
          done();
        });
      });

      it('should only allow the project_manager to delete',  function(done){
        data.projeto1.project_manager = data.professor._id;
        Projeto.create(data.projeto1)
        .then(projeto => {
          chai.request(server)
          .delete(`/api/projects/${projeto._id}`)
          .set('Authorization', 'Bearer ' + data.professor2.token)
          .end((err, res) => {
              res.should.have.status(403);
            done();
          });
        })
      });

      it('should delete specified project', function(done){
        data.projeto1.project_manager = data.professor._id;
        Projeto.create(data.projeto1)
        .then(projeto => {
          chai.request(server)
          .delete(`/api/projects/${projeto._id}`)
          .set('Authorization', 'Bearer ' + data.professor.token)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Project successfully deleted.');
            done();
          });
        })
      });

    });

  });

});
