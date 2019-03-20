const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

const EVAL  = ['High', 'Medium', 'Low', 'None']

let TaskSchema        = new Schema({

  type  : {
    type      : String,
    required  : true
  },

  description  : {
    type      : String,
    required  : true
  },

  role  : {
    type      : String,
    required  : true,
    enum      : ['Student', 'Staff']
  },

  resources : [String]

});

let PhaseSchema       = new Schema({

  name  : {
    type      : String,
    required  : true
  },

  tasks  : {
    type  : [TaskSchema],
    validate  : {
      validator: function(v){
        return v.length >= 1;
      },
      message : 'At least one task should be defined.'
    }
  }
});

let ModuleSchema      = new Schema({

  name  : {
    type      : String,
    required  : true
  },

  phases  : {
    type  : [PhaseSchema],
    validate  : {
      validator: function(v){
        return v.length >= 1;
      },
      message : 'At least one phase should be defined.'
    }
  }
});


let EstruturaTecnicaSchema   = new Schema({

  modules : {
    type      : [ModuleSchema],
    validate  : {
      validator: function(v){
        return v.length >= 1;
      },
      message : 'At least one module should be defined.'
    }
  }
});

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

  rules : [String],

  //Context
  delivery_mode : {
    type     : [String],
    required : true
  },

  interaction : {
    type     : [String],
    required : true
  },

  // Perception
  // interrelationship, motivation, participation, performance

  interrelationship : {
    type     : [String],
    required : true,
    enum     : EVAL
  },

  motivation : {
    type     : [String],
    required : true,
    enum     : EVAL
  },

  participation : {
    type     : [String],
    required : true,
    enum     : EVAL
  },

  performance : {
    type     : [String],
    required : true,
    enum     : EVAL
  },

  scope : {
    type     : [String],
    required : true
  },

  feedback_use : {
    type     : [String],
    required : true,
    enum     : EVAL
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

  affective_objectives : {
    type  : [String]
  },

  social_objectives : {
    type  : [String]
  },

  structure : {
    type      : EstruturaTecnicaSchema,
    required  : true
  },

  psychologist : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }
});

TecnicaSchema.plugin(idValidator);


module.exports = mongoose.model('Tecnica', TecnicaSchema);
