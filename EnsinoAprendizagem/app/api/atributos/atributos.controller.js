const utils       = require('../../components/utils');
const Atributos   = require('../../models/AtributosPossiveis');
const User        = require('../../models/User');

function index(req, res) {

  let query = {};

  Atributos.find(query)
  .then(atributos => {
    return res.status(200).json(atributos);
  })
  .catch(utils.handleError(req, res));
}


function create(req, res) {

  let atributos                   = new Atributos();
  Object.assign(atributos, { ...req.body });
  atributos.psychologist          = req.user;

  atributos.save()
  .then(a => {
    return res.status(201).json(a);
  })
  .catch(utils.handleError(req, res));

}


function edit(req, res) {

  let query = {
    _id : req.params.id
  };

  Atributos.findById(query)
  .then(atributos =>  {
    if(!atributos) {
      return res.status(404).json({error: 'not_found', message: 'Not found.'});
    }

    if(atributos.psychologist.toString() != req.user._id.toString()){
      return res.status(403).json({error: 'forbidden', message: 'You can\'t edit this.'});
    }


    for (let attr in req.body) {
      atributos[attr] = req.body[attr];
    }

    atributos.save()
    .then(a => {
      res.status(200).json(a);
    })
    .catch(utils.handleError(req, res));

  })
  .catch(utils.handleError(req, res));
}

module.exports = {
  index   : index,
  create  : create,
  edit    : edit
};
