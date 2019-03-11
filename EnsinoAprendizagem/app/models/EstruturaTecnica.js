const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let TaskSchema               = new Schema({

  type  : {
    type      : String,
    required  : true,
    enum     : ['Reading', 'Viewing', 'Listening',          //Assimilative
    'Gathering', 'Ordering', 'Classifying',                 //Informationhandling
    'Modelling', 'Simulation',                              //Adaptive
    'Descussing', 'Debating', 'Presenting', 'Critiquing',   //Communicative
    'Creating', 'Producing', 'Writing', 'Drawing',          //Productive
    'Practicing', 'Apllying', 'Mimicking']                  //Experiential
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

let PhaseSchema              = new Schema({

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

let ModuleSchema             = new Schema({

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

module.exports = mongoose.model('EstruturaTecnica', EstruturaTecnicaSchema);
