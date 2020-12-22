"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    console.log(err.message);
    // Error.captureStackTrace(err);
    return res.status(400).json({
        status: 'error',
        message: err.message,
    });
};
exports.default = globalErrorHandler;
