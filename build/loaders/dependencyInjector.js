"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const logger_1 = __importDefault(require("./logger"));
exports.default = () => {
    try {
        typedi_1.default.set("logger", logger_1.default);
    }
    catch (e) {
        logger_1.default.error(`⚠️ Error on dependency injector loader: ${e}`);
        throw e;
    }
};
//# sourceMappingURL=dependencyInjector.js.map