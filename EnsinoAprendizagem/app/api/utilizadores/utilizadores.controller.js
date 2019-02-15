const utils = require('../../components/utils');
const User = require('../../models/User');

function list(req, res){
  let query = {};

  if(req.query.role){
    query.role = req.query.role;
  }
  User.find(query)
  .then(users => res.status(200).json(users))
  .catch(utils.handleError(req, res));
}

module.exports = {
  list : list
};
