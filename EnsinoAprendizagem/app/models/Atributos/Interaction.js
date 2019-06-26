const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let InteractionSchema           = new Schema({
  name  : {
    type      : String,
    required  : true
  },

  psychologist          : {
    type      : mongoose.Schema.Types.ObjectId,
    ref       : 'User',
    required  : true
  }
});

InteractionSchema.plugin(idValidator);

module.exports = mongoose.model('Interaction', InteractionSchema);
