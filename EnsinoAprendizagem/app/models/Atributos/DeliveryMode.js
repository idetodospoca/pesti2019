const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const idValidator     = require('mongoose-id-validator');

let DeliveryModeSchema          = new Schema({
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

DeliveryModeSchema.plugin(idValidator);

module.exports = mongoose.model('DeliveryMode', DeliveryModeSchema);
