const User        = require('../../models/User');
const authService = require('./auth.service');
const utils       = require('../../components/utils');
const _           = require('lodash');
const mailer      = require('../../components/mailer');

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

    if (!user.verified) {
      return res.status(401).json({error: 'not-verified', message: 'Your account hasn\'t been verified yet, please check your e-mail.'});
    }

    let token = authService.signToken(user);

    return res.status(200).json(token);
  })
  .catch(utils.handleError);
}

function register(req, res){

  User.findOne({
    email: req.body.email
  }).then( user => {
    if (user) return res.status(200).send({ msg: 'The e-mail address you have entered is already in use.' });
    user = new User({ name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role });
    user.save()
    .then(user => {
      let token = authService.signToken(user);

      let data = {
        _id            : user._id,
        email          : user.email,
        name           : user.name,
        role           : user.role,
        token          : token.token,
        expirationDate : token.expirationDate
      };

      mailer.sendMail({
        to      : user.email,
        subject : 'Welcome to LearningTechniques',
        text    : `
        Hi ${user.name},\n

        Your account has been created, follow the link to activate it and start using the app\n

        \nhttps:\/\/learningtechniques.herokuapp.com/auth/confirm\/${user.email}\/${token.token}
        `
      });
      return res.status(201).json({message: "Your account has been created. We sent you an e-mail so you can verify it."});
    })
    .catch(utils.handleError(req, res));

  })
  .catch(utils.handleError);

}


function confirm(req, res) {

  authService.verifyToken(req.params.token, (err, decoded) => {
    if(err){
      return res.status(401).json({error: 'invalid_token', message: err.message});
    }

    User.findOne({
      email : req.params.email
    })
    .then(user => {
      if(!user){
        return res.status(401).json({error: 'invalid_user', message: 'The provided e-mail isn\'t valid.'});
      }

      if (user.verified) {
        return res.status(401).json({error: 'verified', message: 'Your account has already been verified.'});
      }

      user.verified = true;
      user.save(function (err) {
          if (err) { return res.status(500).send({ message: err.message }); }
          return res.status(200).json({message: "Your account has been verified. You can now log in."});
      });

    })
  });

}

function resend(req, res) {
  User.findOne({
    email: req.params.email
  })
  .then(user => {
    if(!user){
      return res.status(401).json({error: 'invalid_user', message: 'The e-mail you entered isn\'t valid.'});
    }

    if (user.verified) {
      return res.status(401).json({error: 'verified', message: 'Your account has already been verified.'});
    }

    let token = authService.signToken(user);

    mailer.sendMail({
      to      : user.email,
      subject : 'Welcome to LearningTechniques',
      text    : `
      Hi ${user.name},\n

      Per your request, the follwoing link will activate your account and allow you to use the app\n

      \nhttps:\/\/learningtechniques.herokuapp.com/auth/confirm\/${user.email}\/${token.token}
      `
    });
    return res.status(201).json({message: "We sent you an e-mail so you can validate your account."});
  })
  .catch(utils.handleError);
}







module.exports = {
  login     : login,
  register  : register,
  confirm   : confirm,
  resend    : resend
};
