const utils               = require('../../components/utils');
const DeliveryMode        = require('../../models/Atributos/DeliveryMode');
const ResolutionScope     = require('../../models/Atributos/ResolutionScope');
const Interaction         = require('../../models/Atributos/Interaction');
const Behaviour           = require('../../models/Atributos/Behaviour');
const AffectiveObjective  = require('../../models/Atributos/AffectiveObjective');
const SocialObjective     = require('../../models/Atributos/SocialObjective');
const TaskType            = require('../../models/Atributos/TaskType');
const User                = require('../../models/User');

//Delivery Mode
function indexDM(req, res) {

  let query = {};

  DeliveryMode.find(query)
  .populate('psychologist')
  .then(deliverymode => {
    return res.status(200).json(deliverymode);
  })
  .catch(utils.handleError(req, res));
}

function createDM(req, res) {

  let deliverymode          = new DeliveryMode();
  Object.assign(deliverymode, { ...req.body });
  deliverymode.psychologist = req.user;

  deliverymode.save()
  .then(dm => {
    return res.status(201).json(dm);
  })
  .catch(utils.handleError(req, res));
}

function removeDM (req, res) {
  let query = {
    _id : req.params.id
  };

  DeliveryMode.findById(query)
  .then(async (deliverymode) =>  {

    if(!deliverymode) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(deliverymode.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await DeliveryMode.findByIdAndRemove(deliverymode);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

//Resolution Scope
function indexRS(req, res) {

  let query = {};

  ResolutionScope.find(query)
  .populate('psychologist')
  .then(resolutionscope => {
    return res.status(200).json(resolutionscope);
  })
  .catch(utils.handleError(req, res));
}

function createRS(req, res) {

  let resolutionscope          = new ResolutionScope();
  Object.assign(resolutionscope, { ...req.body });
  resolutionscope.psychologist = req.user;

  resolutionscope.save()
  .then(rs => {
    return res.status(201).json(rs);
  })
  .catch(utils.handleError(req, res));
}

function removeRS(req, res) {
  let query = {
    _id : req.params.id
  };

  ResolutionScope.findById(query)
  .then(async (resolutionscope) =>  {

    if(!resolutionscope) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(resolutionscope.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await ResolutionScope.findByIdAndRemove(resolutionscope);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

//Interaction
function indexINT(req, res) {

  let query = {};

  Interaction.find(query)
  .populate('psychologist')
  .then(deliverymode => {
    return res.status(200).json(deliverymode);
  })
  .catch(utils.handleError(req, res));
}

function createINT(req, res) {

  let interaction          = new Interaction();
  Object.assign(interaction, { ...req.body });
  interaction.psychologist = req.user;

  interaction.save()
  .then(int => {
    return res.status(201).json(int);
  })
  .catch(utils.handleError(req, res));
}

function removeINT(req, res) {
  let query = {
    _id : req.params.id
  };

  Interaction.findById(query)
  .then(async (interaction) =>  {

    if(!interaction) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(interaction.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await Interaction.findByIdAndRemove(interaction);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

//Behaviour
function indexBH(req, res) {

  let query = {};

  Behaviour.find(query)
  .populate('psychologist')
  .then(behaviour => {
    return res.status(200).json(behaviour);
  })
  .catch(utils.handleError(req, res));
}

function createBH(req, res) {

  let behaviour          = new Behaviour();
  Object.assign(behaviour, { ...req.body });
  behaviour.psychologist = req.user;

  behaviour.save()
  .then(bh => {
    return res.status(201).json(bh);
  })
  .catch(utils.handleError(req, res));
}

function removeBH(req, res) {
  let query = {
    _id : req.params.id
  };

  Behaviour.findById(query)
  .then(async (behaviour) =>  {

    if(!behaviour) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(behaviour.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await Behaviour.findByIdAndRemove(behaviour);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

//Affective Objective
function indexAF(req, res) {

  let query = {};

  AffectiveObjective.find(query)
  .populate('psychologist')
  .then(affective => {
    return res.status(200).json(affective);
  })
  .catch(utils.handleError(req, res));
}

function createAF(req, res) {

  let affective          = new AffectiveObjective();
  Object.assign(affective, { ...req.body });
  affective.psychologist = req.user;

  affective.save()
  .then(af => {
    return res.status(201).json(af);
  })
  .catch(utils.handleError(req, res));
}

function removeAF(req, res) {
  let query = {
    _id : req.params.id
  };

  AffectiveObjective.findById(query)
  .then(async (affective) =>  {

    if(!affective) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(affective.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await AffectiveObjective.findByIdAndRemove(affective);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

//Social Objective
function indexSO(req, res) {

  let query = {};

  SocialObjective.find(query)
  .populate('psychologist')
  .then(social => {
    return res.status(200).json(social);
  })
  .catch(utils.handleError(req, res));
}

function createSO(req, res) {

  let social          = new SocialObjective();
  Object.assign(social, { ...req.body });
  social.psychologist = req.user;

  social.save()
  .then(so => {
    return res.status(201).json(so);
  })
  .catch(utils.handleError(req, res));
}

function removeSO(req, res) {
  let query = {
    _id : req.params.id
  };

  SocialObjective.findById(query)
  .then(async (social) =>  {

    if(!social) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(social.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await SocialObjective.findByIdAndRemove(social);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

//Task Type
function indexTT(req, res) {

  let query = {};

  TaskType.find(query)
  .populate('psychologist')
  .then(task => {
    return res.status(200).json(task);
  })
  .catch(utils.handleError(req, res));
}

function createTT(req, res) {

  let task          = new TaskType();
  Object.assign(task, { ...req.body });
  task.psychologist = req.user;

  task.save()
  .then(tt => {
    return res.status(201).json(tt);
  })
  .catch(utils.handleError(req, res));
}

function removeTT(req, res) {
  let query = {
    _id : req.params.id
  };

  TaskType.findById(query)
  .then(async (task) =>  {

    if(!task) {
      return res.status(404).json({error: 'not_found', message: 'This attribute doesn\'t exist.'});
    }

    if(task.psychologist.toString() != req.user._id.toString()) {
      return res.status(403).json({error: 'forbidden', message: 'You can\'t delete this attribute.'});
    } else {
      await TaskType.findByIdAndRemove(task);
      res.json({ message: 'Attribute successfully deleted.' });
    }

  })
  .catch(utils.handleError(req, res));
}

module.exports = {
  indexDM   : indexDM,
  createDM  : createDM,
  removeDM  : removeDM,

  indexRS   : indexRS,
  createRS  : createRS,
  removeRS  : removeRS,

  indexINT   : indexINT,
  createINT  : createINT,
  removeINT  : removeINT,

  indexBH   : indexBH,
  createBH  : createBH,
  removeBH  : removeBH,

  indexAF   : indexAF,
  createAF  : createAF,
  removeAF  : removeAF,

  indexSO   : indexSO,
  createSO  : createSO,
  removeSO  : removeSO,

  indexTT   : indexTT,
  createTT  : createTT,
  removeTT  : removeTT

};
