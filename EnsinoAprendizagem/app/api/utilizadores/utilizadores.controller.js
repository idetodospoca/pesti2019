const utils = require('../../components/utils');
const User = require('../../models/User');

function index(req, res){
  let query = {};

  if(req.query.role){
    query.role = req.query.role;
  }
  User.find(query)
  .then(users => res.status(200).json(users))
  .catch(utils.handleError(req, res));
}

function show(req, res){
  let query = {
    email: req.params.id
  };

  User.findOne(query)
  .then(user => {
    if(!user){
      return res.status(404).json({error: 'not_found', message: 'User not found.'});
    }
    res.status(200).json(user);
  })
  .catch(utils.handleError(req, res));
}

module.exports = {
  index : index,
  show  : show
};
