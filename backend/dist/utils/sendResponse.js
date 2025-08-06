"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        meta: data.meta,
        result: data.result,
    });
};
exports.default = sendResponse;
