process.env.NODE_ENV = 'test';

const User   = require('../../app/models/User');
const assert = require('chai').assert;
const data   = require('../data.json');
const expect = require('chai').expect;


describe('Users', function(){
    beforeEach(function() {
        return User.remove({});
    });

    it('should automatically hash the password once it is changed', () => {
        return User.create(data.psicologo_educacional)
        .then(user => {
            assert.notEqual(data.psicologo_educacional.password, user.password, "The original password should never be stored");
        });
    });

    it('should be possible to compare the hashed password', () => {
        return User.create(data.psicologo_educacional)
        .then(user => {
            assert.isTrue(user.checkPassword(data.psicologo_educacional.password), "The password should be hashed");
        });
    });

    it('should not allow duplicate emails', function(done){
        User.create(data.psicologo_educacional)
        .then(() => {
            User.create(data.psicologo_educacional, function(err, user){
                expect(err).to.not.be.null;
                expect(err.errors).to.have.property('email');

                User.find({})
                .then((users) => {
                    expect(users).to.be.an('array').that.has.lengthOf(1);
                    done();
                });
            });
        });
    });

    it('should only allow expected roles', () => {
        let user = new User(data.psicologo_educacional);
        user.role = '';

        let validator = user.validateSync();
        expect(validator.errors).to.have.property('role');

        user.role = 'random';
        validator = user.validateSync();
        expect(validator.errors).to.have.property('role');

        user.role = 'admin';
        validator = user.validateSync();

        expect(validator).to.be.undefined;
    });
});
