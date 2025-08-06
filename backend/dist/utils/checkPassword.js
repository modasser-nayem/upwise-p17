"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.comparePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
//comparing password with new password
const comparePassword = (newPass, oldPass) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(newPass, oldPass);
    return result;
});
exports.comparePassword = comparePassword;
// make password into hash form
const hashPassword = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.hash(pass, config_1.envConfig.BCRYPT_SALT_ROUNDS);
    return result;
});
exports.hashPassword = hashPassword;
