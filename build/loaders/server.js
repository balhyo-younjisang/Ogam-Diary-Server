"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
exports.default = ({ app }) => {
    /**
     * Health Check endpoints
     */
    app.get(`${config_1.default.api.prefix}/status`, (req, res) => {
        res.status(200).end();
    });
    app.head(`${config_1.default.api.prefix}/status`, (req, res) => {
        res.status(200).end();
    });
    app.enable("trust proxy");
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    app.use(config_1.default.api.prefix, (0, api_1.default)());
    // 404 에러 캐치
    app.use((req, res, next) => {
        const err = new Error("Not Found");
        err["status"] = 404;
        next(err);
    });
    // 에러 핸들러
    app.use((err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
//# sourceMappingURL=server.js.map