const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let TaskTypeSchema              = new Schema({
  category  : {
    type      : String,
    required  : true
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

TaskTypeSchema.plugin(idValidator);

module.exports = mongoose.model('TaskType', TaskTypeSchema);
