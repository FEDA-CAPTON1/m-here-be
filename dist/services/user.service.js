"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const app_error_1 = __importDefault(require("../utils/app.error"));
class UserService {
    async createUser(test_data) {
        return (await user_model_1.UserInstance.create(test_data));
    }
    async loginUser(test_data) {
        return (await user_model_1.UserInstance.create(test_data));
    }
    async findUserByEmail(email) {
        try {
            const user = await user_model_1.UserInstance.findOne({ where: { email } });
            return user;
        }
        catch (error) {
            return next(new app_error_1.default(400, 'Invalid User, please enter a valid email address'));
        }
    }
    async findUserById(userId) {
        try {
            const user = await user_model_1.UserInstance.findByPk(userId);
            return user;
        }
        catch (error) {
            return next(new app_error_1.default(400, 'Invalid User id'));
        }
    }
}
exports.UserService = UserService;
function next(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=user.service.js.map