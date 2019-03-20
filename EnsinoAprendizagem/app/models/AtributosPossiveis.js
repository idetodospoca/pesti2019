const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;


let BehaviourSchema = new Schema({
  category  : {
    type      : String,
    required  : true,
    enum      : ['Remember', 'Understand', 'Apply', 'Analise', 'Evaluate', 'Create']
  },

  verb  : {
    type      : String,
    required  : true
  }

});

let AffectiveObjectiveSchema = new Schema({
  category  : {
    type      : String,
    required  : true,
    enum      : ['Internalizing Values', 'Organization', 'Receiving Phenomena', 'Responding to Phenomena', 'Valuing']
  },

  verb  : {
    type      : String,
    required  : true
  }

});

let TaskTypeSchema  = new Schema({
  category  : {
    type      : String,
    required  : true
  },

  verb  : {
    type      : String,
    required  : true
  }

});

let AtributosSchema = new Schema({
  delivery_mode         : [String],
  interaction           : [String],
  resolution_scope      : [String],
  behaviour             : [BehaviourSchema],
  affective_objectives  : [AffectiveObjectiveSchema],
  social_objectives     : [String],
  task_types            : [TaskTypeSchema],
  psychologist          : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }
});


module.exports = mongoose.model('Atributos', AtributosSchema);
