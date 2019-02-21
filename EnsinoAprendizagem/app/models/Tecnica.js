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


let TecnicaSchema     = new Schema({

  name  : {
    type     : String,
    required : true
  },

  description  : {
    type     : String,
    required : true
  },

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
    type     : String,
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

  psicologo : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }
});

TecnicaSchema.plugin(idValidator);


module.exports = mongoose.model('Tecnica', TecnicaSchema);
