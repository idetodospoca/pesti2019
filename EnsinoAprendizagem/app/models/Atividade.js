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
    required : true,
    enum     : ['Face to face', 'Distance', 'Blended']
  },

  interaction : {
    type     : String,
    required : true,
    enum     : ['Class based', 'Group based', 'One to many', 'One to one']
  },

  scope : {
    type     : String,
    required : true,
    enum     : ['Open ended', 'Close ended']
  },

  age : {       // Target Audience
    type     : Number,
    required : true,
    min      : 5
  },

  feedback_use : {
    type     : String,
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
  },


  // Educator's Perception - Part of TLC
  // interrelationship, motivation, participation, performance

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

  performance : {
    type     : String,
    required : true,
    enum     : ['High', 'Medium', 'Low', 'None']
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

  social_objective : {
    type  : String,
    enum  : ['Accept', 'Cooperate', 'Give', 'Relate']
  },

  affective_objective : {
    type  : String,
    enum  : ['Listen', 'Modify', 'Perform', //internalizingvalues
    'Formulate', 'Organize', 'Systhesize',  //organization
    'Ask', 'Follow', 'Name',                //receivingphenomena
    'Answer', 'Discuss', 'Help',            //respondingtophenomena
    'Invite', 'Share', 'Work']              //valuing
  },

  //  Teacher that initiates the activity
  project_manager : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }

});

AtividadeSchema.plugin(idValidator);


module.exports = mongoose.model('Atividade', AtividadeSchema);
