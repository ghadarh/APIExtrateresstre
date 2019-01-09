const Joi = require('Joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res) => {
      const result = Joi.validate({ param: req['params'][name]}, schema);
      if (result.error) {
        return res.status(404).json(result.error);
      } else {
        if (!req.value)
           req.value = {};

        if (!req.value['params'])
           req.value['params'] = {};

        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },

  schemas: {
    idSchema: Joi.object().keys({
      ExtId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }

}
