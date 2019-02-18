const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;

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

let AtividadeSchema   = new Schema({
  description : {
    type     : String,
    required : true
  },

  subject : {
    type     : String,
    required : true
  },

  delivery_mode : {
    type     : String,
    required : true,
    enum     : ['Face to face', 'Distance', 'Blended']
  },

  interaction : {
    type     : String,
    required : true,
    enum     : ['Class based', 'Group based', 'One to many', 'One to one']
  },

  //Perception

  interrelationship : {
    type     : String,
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  motivation : {
    type     : String,
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  participation : {
    type     : String,
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  scope : {
    type     : String,
    required : true,
    enum     : ['Open ended', 'Close ended']
  },

  feedback_use : {
    type     : String,
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },

  age : {
    type     : Number,
    required : true,
    min      : 0
  },

  learning_objectives : {
    type      : [LearningSchema],
    validate : {
      validator: function(v){
        return v.length >= 1;
      },
      message : 'Deve definir pelo menos 1 objetivo de aprendizagem.'
    }
  },

  subject_matter : {
    type     : String,
    required : true
  },

  conditions  : String,
  degree      : String

});




module.exports = mongoose.model('Atividade', AtividadeSchema);
