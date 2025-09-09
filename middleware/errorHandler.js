const ENUM = require("../constants");
const errorHandler = (err,req,res,next)=>{
    
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch (statusCode) {
        case ENUM.constants.NOT_FOUND:
            res.json({title: "NOT FOUND!", message: err.message, stackTrace: err.stack});
            break;
        case ENUM.constants.VALIDATION_ERROR:
            res.json({title: "Validation Failed", message: err.message, stackTrace: err.stack});
            break;
        case ENUM.constants.UNAUTHORIZED:
            res.json({title: "Unauthorized Access", message: err.message, stackTrace: err.stack});
            break;
        case ENUM.constants.ACCESS_REQUIRED:
            res.json({title: "Forbidden", message: err.message, stackTrace: err.stack});
            break;
        case ENUM.constants.SERVER_SIDE:
            res.json({title: "Server Side Error.", message: err.message, stackTrace: err.stack});
            break;
        default:
            //no errors found!
            break;
    }
}
module.exports = errorHandler;
