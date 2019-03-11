const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const bcrypt          = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps      = require('../components/timestamps');

var UserSchema   = new Schema({
  name : {
    type     : String,
    required : [true, "`Name` is required."]
  },

  email : {
    type     : String,
    required : [true, "`E-mail` is required."],
    index: true,
    unique: true
  },

  password : {
    type     : String,
    required : [true, "`Password` is required."],
    select: false, //Hide from general queries
    validate : {
      validator: function(v) {
        return v.length >= 8;
      },
      message : 'Password must be at least 8 characters long.'
    },
  },

  role: {
    type     : String,
    required : true,
    enum     : ['admin', 'professor', 'psicologo_escolar', 'psicologo_educacional']
  }
});

UserSchema.pre('save', function(next, done) {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(timestamps);

module.exports = mongoose.model('User', UserSchema);
