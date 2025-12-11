"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../core/repository/user.controller");
const { authenticateToken } = require('../middleware/auth.middleware');
class UserRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.resume = new user_controller_1.UserController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/users', this.resume.getUsers.bind(this.resume));
        this.router.post('/update', this.resume.updateCompany.bind(this.resume));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRouter;
