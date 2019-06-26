const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let ResolutionScopeSchema       = new Schema({
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

ResolutionScopeSchema.plugin(idValidator);

module.exports = mongoose.model('ResolutionScope', ResolutionScopeSchema);
