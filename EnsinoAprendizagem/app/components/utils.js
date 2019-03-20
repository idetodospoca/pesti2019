const mongoose = require('mongoose');

function handleValidationError(err, res){
  let errors = [];
  for (var errName in err.errors) {
    let property = err.errors[errName];

    errors.push({
      message: property.message,
      field: property.path || property.properties.path
    });
  }
  return res.status(422).json({
    error   : 'validation_error',
    message : 'Some fields could not be validated.',
    data    : errors
  });
}

function handleCastError(err, res){
  return res.status(404).json({error: 'not_found', message: `${err.model.modelName} does not exist.`});
}

function handleApiError(err, res) {
  if(err.response.status == 400) {
    let data = err.response.data;
    let errors = [];
    for (let property of Object.keys(data) ) {
      for(let errMessage of data[property]) {
        errors.push({
          message: errMessage,
          field: property
        });
      }

    }
    return res.status(422).json({
      error   : 'validation_error',
      message : 'Some fields could not be validated.',
      data    : errors
    });
  }

  return res.status(err.response.status).json({error: 'invalid_request', message: err.response.statusText});
}

function handleError(req, res, defaultStatus){
  return function(err){
    //Check if validation error
    if(err.name == 'ValidationError'){
      return handleValidationError(err, res);
    }else if(err.name == 'CastError'){
      return handleCastError(err, res);
    }else if(err.hasOwnProperty('response')) {
      return handleApiError(err, res);
    }
    console.error('An unexpected error has occurred', err);
    return res.status(defaultStatus || 500).json({
      error   : 'internal_server_error',
      message : 'Something went wrong, please try again later.'
    });
  };
}

module.exports.handleError = handleError;
