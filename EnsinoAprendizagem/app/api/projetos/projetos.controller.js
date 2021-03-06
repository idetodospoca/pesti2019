const utils     = require('../../components/utils');
const Projeto   = require('../../models/Projeto');
const User      = require('../../models/User');
const mailer    = require('../../components/mailer');

function index(req, res) {

  let query = {};

  Projeto.find(query)
  .populate('project_manager')
  .populate('teachers')
  .populate('techniques')
  .then(projetos => {
    return res.status(200).json(projetos);
  })
  .catch(utils.handleError(req, res));
}

function show(req, res){
  let query = {
    _id: req.params.id
  };

  Projeto.findOne(query)
  .populate('project_manager')
  .populate('teachers')
  .populate('techniques')
  .then(projeto => {
    if(!projeto){
      return res.status(404).json({error: 'not_found', message: 'Project not found.'});
    }
    res.status(200).json(projeto);
  })
  .catch(utils.handleError(req, res));
}


function create(req, res) {

  let projeto                   = new Projeto();
  Object.assign(projeto, { ...req.body });
  projeto.project_manager       = req.user;

  projeto.save()
  .then(p => {
    return res.status(201).json(p);
  })
  .catch(utils.handleError(req, res));

}


function remove(req, res) {

  let query = {
    _id : req.params.id
  };

  Projeto.findById(query)
  .then(async (projeto) =>  {

    if(!projeto) {
      return res.status(404).json({error: 'not_found', message: 'This project doesn\'t exist.'});
    }

    if(projeto.project_manager.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this project.'});
    } else {
      await Projeto.findByIdAndRemove(query);
      res.json({ message: 'Project successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

function edit(req, res) {

  let query = {
    _id : req.params.id
  };

  Projeto.findById(query)
  .then(async (projeto) =>  {

    if(!projeto) {
      return res.status(404).json({error: 'not_found', message: 'This project doesn\'t exist.'});
    }

    if ( projeto.project_manager.toString() != req.user._id.toString() && (projeto.teachers.indexOf(req.user._id) === -1) )  {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t edit this project.'});
    } else {
      await Projeto.findOneAndUpdate(query, req.body, {new: true, useFindAndModify: false});
      res.json({ message: 'Project successfully edited.'});
    }

  })
  .catch(utils.handleError(req, res));

}


function invite(req, res) {
  Projeto.findById(req.params.id)
  .populate('project_manager')
  .then(async (projeto) =>  {

    if(!projeto) {
      return res.status(404).json({error: 'not_found', message: 'This project doesn\'t exist.'});
    }

    if ( projeto.project_manager._id.toString() != req.user._id.toString() )  {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t invite users to this project.'});
    } else {
      await User.findOne({email: req.params.email})
        .then(user => {
          if(!user){
            return res.status(404).json({error: 'not_found', message: 'User not found.'});
          }
          projeto.teachers.push(user._id);
          mailer.sendMail({
            to      : req.params.email,
            subject : 'Invitation to collaborate.',
            text    : `
            Hi ${user.name},\n

            ${projeto.project_manager.name} has invited you to collaborate on their project ${projeto.name}\n

            You can now collaborate and make changes to it.
            `
          });
          projeto.save()
          .then(p => {
            return res.status(201).json({ message: 'Invite sent.'});
          })
          .catch(utils.handleError(req, res));
        })
        .catch(utils.handleError(req, res));
    }
  })
  .catch(utils.handleError(req, res));
}

module.exports = {
  index   : index,
  show    : show,
  create  : create,
  remove  : remove,
  edit    : edit,
  invite  : invite
};
