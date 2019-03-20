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


function create(req, res) {

  let tecnica                   = new Tecnica();
  let learning_objectives       = req.body.learning_objectives;
  let structure                 = req.body.structure;
  let modules                   = req.body.modules;
  let phases                    = req.body.phases
  let tasks                     = req.body.tasks;

  phases.tasks                  = tasks.map(t => { return t; });
  modules.phases                = phases.map(p => { return p; });
  structure.modules             = modules.map(m => { return m; });

  tecnica.name                  = req.body.name;
  tecnica.description           = req.body.description;
  tecnica.rules                 = req.body.rules;
  tecnica.delivery_mode         = req.body.delivery_mode;
  tecnica.interaction           = req.body.interaction;
  tecnica.interrelationship     = req.body.interrelationship;
  tecnica.motivation            = req.body.motivation;
  tecnica.participation         = req.body.participation;
  tecnica.performance           = req.body.performance;
  tecnica.scope                 = req.body.scope;
  tecnica.feedback_use          = req.body.feedback_use;
  tecnica.target_audience       = req.body.target_audience;
  tecnica.learning_objectives   = learning_objectives.map(l =>  {
    return  l;
  });
  tecnica.affective_objectives  = req.body.affective_objectives;
  tecnica.social_objectives     = req.body.social_objectives;
  tecnica.structure             = req.body.structure;
  tecnica.psychologist          = req.user;

  tecnica.save()
  .then(t => {
    return res.status(201).json(t);
  })
  .catch(utils.handleError(req, res));

}

function edit(req, res) {

  let query = {
    _id : req.params.id
  };

  Projeto.findById(query)
  .then(tecnica =>  {
    if(!tecnica) {
      return res.status(404).json({error: 'not_found', message: 'This technique doesn\'t exist.'});
    }

    if(tecnica.psychologist.toString() != req.user._id.toString()){
      return res.status(403).json({error: 'forbidden', message: 'You can\'t edit this technique.'});
    }


    for (let attr in req.body) {
      tecnica[attr] = req.body[attr];
    }

    tecnica.save()
    .then(t => {
      res.status(200).json(t);
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
