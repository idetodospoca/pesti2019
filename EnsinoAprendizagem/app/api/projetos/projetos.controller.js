const utils     = require('../../components/utils');
const Projeto   = require('../../models/Projeto');
const User      = require('../../models/User');

function index(req, res) {

  let query = {};

  Projeto.find(query)
  .then(projetos => {
    return res.status(200).json(projetos);
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
      await Project.findByIdAndRemove(query);
    }


    res.status(200).send("Project deleted.");


  })
  .catch(utils.handleError(req, res));
}

function edit(req, res) {

  let query = {
    _id : req.params.id
  };

  Projeto.findById(query)
  .then(projeto =>  {
    if(!projeto) {
      return res.status(404).json({error: 'not_found', message: 'This project doesn\'t exist.'});
    }

    if((projeto.project_manager.toString() != req.user._id.toString()) && (!projeto.teachers.find(req.user._id.toString()))){
      return res.status(403).json({error: 'forbidden', message: 'You can\'t edit this project.'});
    }


    for (let attr in req.body) {
      projeto[attr] = req.body[attr];
    }

    projeto.save()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(utils.handleError(req, res));

  })
  .catch(utils.handleError(req, res));
}

module.exports = {
  index   : index,
  create  : create,
  remove  : remove,
  edit    : edit
};
