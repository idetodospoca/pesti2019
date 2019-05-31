const utils     = require('../../components/utils');
const Tecnica   = require('../../models/Tecnica');
const User      = require('../../models/User');

function index(req, res) {

  let query = {};

  Tecnica.find(query)
  .then(tecnicas => {
    return res.status(200).json(tecnicas);
  })
  .catch(utils.handleError(req, res));
}

function show(req, res){
  let query = {
    _id: req.params.id
  };

  Tecnica.findOne(query)
  .populate('psychologist')
  .then(tecnica => {
    if(!tecnica){
      return res.status(404).json({error: 'not_found', message: 'Technique not found.'});
    }
    res.status(200).json(tecnica);
  })
  .catch(utils.handleError(req, res));
}

function create(req, res) {

  let tecnica                   = new Tecnica();
  Object.assign(tecnica, { ...req.body });
  tecnica.psychologist          = req.user;

  tecnica.save()
  .then(t => {
    return res.status(201).json(t);
  })
  .catch(utils.handleError(req, res));

}


function remove(req, res) {

  let query = {
    _id : req.params.id
  };

  Tecnica.findById(query)
  .then(async (tecnica) =>  {

    if(!tecnica) {
      return res.status(404).json({error: 'not_found', message: 'This technique doesn\'t exist.'});
    }

    if(tecnica.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this technique.'});
    } else {
      await Tecnica.findByIdAndRemove(query);
      res.json({ message: 'Technique successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}



function edit(req, res) {

  let query = {
    _id : req.params.id
  };

  Tecnica.findById(query)
  .then(async (tecnica) =>  {

    if(!tecnica) {
      return res.status(404).json({error: 'not_found', message: 'This technique doesn\'t exist.'});
    }

    if(tecnica.psychologist.toString() != req.user._id.toString()){
      return res.status(403).json({error: 'forbidden', message: 'You can\'t edit this technique.'});
    } else {
      await Tecnica.findOneAndUpdate(query, req.body, {new: true});
      res.json({ message: 'Technique successfully edited.'});
    }

  })
  .catch(utils.handleError(req, res));

}


module.exports = {
  index   : index,
  show    : show, 
  create  : create,
  remove  : remove,
  edit    : edit
};
