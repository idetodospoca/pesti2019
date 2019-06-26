const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let SocialObjectiveSchema       = new Schema({
  name  : {
    type      : String,
    required  : true
  },

  psychologist          : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }
});

SocialObjectiveSchema.plugin(idValidator);

module.exports = mongoose.model('SocialObjective', SocialObjectiveSchema);
