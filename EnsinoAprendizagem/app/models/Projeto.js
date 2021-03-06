const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

const EVAL  = ['High', 'Medium', 'Low', 'None']

let LearningSchema    = new Schema({
  knowledge_category : {
    type     : String,
    required : true,
    enum     : ['Factual', 'Conceptual', 'Procedural', 'Metacognitive']
  },

  behaviour : {
    type     : String,
    required : true
  },

  subject_matter : {
    type     : String,
    required : true
  },

  // Optinal/if any
  conditions  : String,
  degree      : String
});


/*
Activity can be defined by:
Activity Analytics,
Teaching-Learning Context,
At least 1 Teaching-Learning Objective.

*/
let AtividadeSchema   = new Schema({


  // Activity Analytics
  description : {
    type     : String,
    required : true
  },

  subject : {
    type     : String,
    required : true
  },


  // Teaching-Learning Context
  delivery_mode : {
    type     : String,
    required : true
  },

  interaction : {
    type     : String,
    required : true
  },

  scope : {
    type     : String,
    required : true
  },

  age : {       // Target Audience
    type     : Number,
    required : true,
    min      : 5
  },

  feedback_use : {
    type     : String,
    required : true,
    enum     : EVAL
  },


  // Educator's Perception - Part of TLC
  // interrelationship, motivation, participation, performance

  interrelationship : {
    type     : String,
    required : true,
    enum     : EVAL
  },

  motivation : {
    type     : String,
    required : true,
    enum     : EVAL
  },

  participation : {
    type     : String,
    required : true,
    enum     : EVAL
  },

  performance : {
    type     : String,
    required : true,
    enum     : EVAL
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

  affective_objectives : {
    type  : [String]
  },

  social_objectives : {
    type  : [String]
  }

});


let ProjetoSchema = new Schema({

  name            : {
    type      : String,
    required  : true
  },

  goal            : {
    type      : String,
    required  : true
  },

  activity        :  {
    type      : AtividadeSchema,
    required  : true
  },

  date            : {
    type      : Date,
    default   : Date.now
  },

  //  Teacher that initiates the activity
  project_manager : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  },

  //  Teachers invited to collaborate
  teachers        : [{
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
  }],

  status          : {
    type      : String,
    required  : true,
    enum      : ['In Development', 'Being Presented', 'Done'],
    default   : 'In Development'
  },

  canCopy         : {
    type      : Boolean,
    required  : true
  },

  techniques      : [{
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'Tecnica'
  }]

});

ProjetoSchema.plugin(idValidator);


module.exports = mongoose.model('Projeto', ProjetoSchema);
