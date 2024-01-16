"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./routes/user"));
const diary_1 = __importDefault(require("./routes/diary"));
const config_1 = __importDefault(require("../config"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.all(`${config_1.default.api.prefix}`);
    (0, user_1.default)(app);
    (0, diary_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map