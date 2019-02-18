const utils = require('../../components/utils');
const Atividade = require('../../models/Atividade');


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
  let learning_objectives       = req.body.learning_objectives  ||  [];

  atividade.learning_objectives = learning_objectives.map(i =>  {
    return  i;
  });

  atividade.save()
  .then(e => {
    return res.status(200).json(e);
  })
  .catch(utils.handleError(req, res));

}


module.exports = {
  index   : index,
  create  : create
};
