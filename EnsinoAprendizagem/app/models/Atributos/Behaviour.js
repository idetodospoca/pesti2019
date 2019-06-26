const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let BehaviourSchema             = new Schema({
  category  : {
    type      : String,
    required  : true,
    enum      : ['Remember', 'Understand', 'Apply', 'Analise', 'Evaluate', 'Create']
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

BehaviourSchema.plugin(idValidator);

module.exports = mongoose.model('Behaviour', BehaviourSchema);
