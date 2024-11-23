const { Sequelize, ValidationError } = require('sequelize');
export default class BaseController {
    constructor() {}
  
    success(res, data, message = 'Success') {
      return res.status(200).json({
        success: true,
        message,
        data
      });
    }

    error(res,statusCode = 400, key="key", message = 'Error') {
      return res.status(statusCode).json({
        success: false,
        errors:[{
          key,
          message
        }]
      });
    }
  
    serverError(res, error) {
      if (error instanceof ValidationError) {
        const newArray = error.errors.map(item => {
          return {
            key: item.path,
            message: item.message
          };
        });
        return res.status(400).json({
          success: false,
          errors:newArray
        });
      } else {
        return res.status(500).json({
          success: false,
          message: error?.message??"Internal Server Error"
        });
      }
    }
}
  