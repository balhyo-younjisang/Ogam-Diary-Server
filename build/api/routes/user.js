"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const user_1 = __importDefault(require("../../services/user"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use(`/user`, route);
    /***
     * @path /api/v1/login
     * @description email과 password를 json 형태로 전달받아 로그인 로직 처리
     */
    route.post("/login", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(), // 이메일 유효성 검사
            password: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res) => {
        const userServiceInstance = typedi_1.Container.get(user_1.default);
        const email = await userServiceInstance.SignIn(req.body);
        return res.status(201).json({ email });
    });
    /***
     * @path /api/v1/join
     * @description email과 password, confirm password 를 json 형태로 전달받아 회원가입 로직 처리
     */
    route.post("/join", (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().required(), // 이메일 유효성 검사
            password: celebrate_1.Joi.string().required(),
            confirmPassword: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res, next) => {
        const userServiceInstance = typedi_1.Container.get(user_1.default);
        const email = await userServiceInstance.SignUp(req.body);
        return res.status(201).json({ email });
    });
};
//# sourceMappingURL=user.js.map