const Joi  = require('@hapi/joi');

function validate(data,schema){
    const { error } = Joi.validate(data,schema);
    return error;
}

function validationHandler(schema,check = 'body'){
    return function(req,res,next){
        console.log(req[check]);
        const error = validate(req[check] , schema);
        error ? next(new Error(error)) : next();
    }
}

module.exports = validationHandler;