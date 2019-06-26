const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');


let AffectiveObjectiveSchema    = new Schema({
  category  : {
    type      : String,
    required  : true,
    enum      : ['Internalizing Values', 'Organization', 'Receiving Phenomena', 'Responding to Phenomena', 'Valuing']
  },

  verb      : {
    type      : String,
    required  : true
  },

  psychologist          : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }

});

AffectiveObjectiveSchema.plugin(idValidator);

module.exports = mongoose.model('AffectiveObjective', AffectiveObjectiveSchema);
