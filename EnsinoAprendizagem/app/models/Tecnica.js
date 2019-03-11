const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');


let LearningSchema    = new Schema({
  knowledge_category : {
    type     : String,
    required : true,
    enum     : ['Factual', 'Conceptual', 'Procedural', 'Megacognitive']
  },

  behaviour : {
    type     : String,
    required : true,
    enum     : ['Defining', 'Describing', 'Listing', 'Recall',  //Remember category
    'Explaining', 'Generalizing', 'Rewriting', 'Summarizing',   //Understand category
    'Implementing', 'Organizing', 'Solving', 'Constructing',    //Apply category
    'Analising', 'Comparing', 'Contrasting', 'Discriminating',  //Analise category
    'Ranking', 'Assessing', 'Monitoring', 'Judging',            //Evaluate category
    'Generating', 'Planning', 'Creating', 'Inventing']          //Create category
  }
});


/*
  Technique defined by:
  Init Data + Tlt Data.
  Init Data consists of name, description and set of rules.
  Tlt Data is defined by context and structure

*/
let TecnicaSchema     = new Schema({

  //Init Data
  name  : {
    type     : String,
    required : true
  },

  description  : {
    type     : String,
    required : true
  },

  //Context
  delivery_mode : {
    type     : [String],
    required : true,
    enum     : ['Face to face', 'Distance', 'Blended']
  },

  interaction : {
    type     : [String],
    required : true,
    enum     : ['Class based', 'Group based', 'One to many', 'One to one']
  },

  // Perception
  // interrelationship, motivation, participation, performance

  interrelationship : {
    type     : [String],
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  motivation : {
    type     : [String],
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  participation : {
    type     : [String],
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  performance : {
    type     : [String],
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  scope : {
    type     : [String],
    required : true,
    enum     : ['Open ended', 'Close ended']
  },

  feedback_use : {
    type     : [String],
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  target_audience : {
    type     : [Number],
    required : true
  },

  learning_objectives : {
    type      : [LearningSchema],
    validate : {
      validator: function(v){
        return v.length >= 1;
      },
      message : 'At least one learning objective should be defined.'
    }
  },

  structure : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'EstruturaTecnica',
    required  : true

  },

  psicologo : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }
});

TecnicaSchema.plugin(idValidator);


module.exports = mongoose.model('Tecnica', TecnicaSchema);
