"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const firebase_1 = require("../config/firebase");
const auth_1 = require("firebase/auth");
let UserService = class UserService {
    constructor(logger) {
        this.logger = logger;
    }
    async SignUp(userInputDTO) {
        try {
            const { password, confirmPassword } = userInputDTO;
            if (password !== confirmPassword)
                throw new Error("The password you entered is incorrect.");
            const { user } = await (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, userInputDTO.email, password);
            return user.email;
        }
        catch (e) {
            throw new Error("Sign up is failed");
        }
    }
    async SignIn(userInputDTO) {
        try {
            const { email, password } = userInputDTO;
            this.logger.info(email);
            const { user } = await (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password);
            return user.email;
        }
        catch (e) {
            throw new Error("Invalid Password");
        }
    }
};
UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("logger")),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user.js.map