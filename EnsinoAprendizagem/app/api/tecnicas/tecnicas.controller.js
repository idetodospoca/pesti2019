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
  let learning_objectives       = req.body.learning_objectives  ||  [];

  tecnica.psicologo             = req.user;
  tecnica.learning_objectives   = learning_objectives.map(l =>  {
    return  l;
  });

  tecnica.save()
  .then(t => {
    return res.status(201).json(t);
  })
  .catch(utils.handleError(req, res));

}


module.exports = {
  index   : index,
  create  : create
};
