const User        = require('../../models/User');
const authService = require('./auth.service');
const utils       = require('../../components/utils');
const _           = require('lodash');

function login(req, res){
  User.findOne({
    email : req.body.email
  })
  .select('+password')
  .exec()
  .then(user => {
    if(!user){
      return res.status(401).json({error: 'invalid_user', message: 'The e-mail you entered isn\'t valid.'});
    }

    if(!user.checkPassword(req.body.password)){
      return res.status(401).json({error: 'invalid_user', message: 'The password you entered isn\'t valid.'});
    }

    let token = authService.signToken(user);

    return res.status(200).json(token);
  })
  .catch(utils.handleError);
}

function register(req, res){
  let user      = new User();
  user.email    = req.body.email;
  user.name     = req.body.name;
  user.password = req.body.password;
  user.role     = req.body.role;
  user.save()
  .then(user => {
    // create a token
    let token = authService.signToken(user);

    let data = {
      _id            : user._id,
      email          : user.email,
      name           : user.name,
      role           : user.role,
      token          : token.token,
      expirationDate : token.expirationDate
    };

    res.status(201).json(data);
  })
  .catch(utils.handleError(req, res));
}

module.exports = {
  login: login,
  register: register
};
