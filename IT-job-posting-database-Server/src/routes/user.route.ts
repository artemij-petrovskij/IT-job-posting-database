import express from "express";
import { UserController } from "../core/repository/user.controller";

const { authenticateToken } = require('../middleware/auth.middleware')


interface Routes {
    initRoutes(): any
    getRouter(): any
}

class UserRouter implements Routes {
    router = express.Router();
    resume = new UserController();

    constructor() {
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

export default UserRouter; 