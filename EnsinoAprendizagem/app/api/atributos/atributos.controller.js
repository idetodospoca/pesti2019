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


module.exports = {
  index   : index,
  create  : create
};
