"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const server_1 = __importDefault(require("./server"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
exports.default = async ({ experssApp }) => {
    await (0, dependencyInjector_1.default)();
    await (0, server_1.default)({ app: experssApp });
    logger_1.default.info("Express loaded");
};
//# sourceMappingURL=index.js.map