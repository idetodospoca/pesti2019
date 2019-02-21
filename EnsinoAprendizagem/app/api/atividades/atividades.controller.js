const utils     = require('../../components/utils');
const Atividade = require('../../models/Atividade');
const User      = require('../../models/User');

function index(req, res) {

  let query = {};

  Atividade.find(query)
  .then(atividades => {
    return res.status(200).json(atividades);
  })
  .catch(utils.handleError(req, res));
}


function create(req, res) {

  let atividade                 = new Atividade();
  let learning_objectives       = req.body.learning_objectives;

  atividade.professor           = req.user;
  atividade.description         = req.body.description;
  atividade.subject             = req.body.subject;
  atividade.delivery_mode       = req.body.delivery_mode;
  atividade.interaction         = req.body.interaction;
  atividade.interrelationship   = req.body.interrelationship;
  atividade.motivation          = req.body.motivation;
  atividade.participation       = req.body.participation;
  atividade.performance         = req.body.performance;
  atividade.scope               = req.body.scope;
  atividade.feedback_use        = req.body.feedback_use;
  atividade.age                 = req.body.age;
  atividade.subject_matter      = req.body.subject_matter;
  atividade.conditions          = req.body.conditions || "";
  atividade.degree              = req.body.degree || "";
  atividade.learning_objectives = learning_objectives.map(l =>  {
    return  l;
  });

  atividade.save()
  .then(a => {
    return res.status(201).json(a);
  })
  .catch(utils.handleError(req, res));

}


module.exports = {
  index   : index,
  create  : create
};
