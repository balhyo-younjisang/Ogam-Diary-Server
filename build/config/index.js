"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// "development"를 NODE_ENV 기본값으로 설정
process.env.NODE_ENV = process.env.NODE_ENV || "development";
// const foundedEnv = dotenv.config();
// if (foundedEnv.error) {
//   throw new Error("⚠️ Couldn't find .env file ⚠️");
// }
exports.default = {
    port: parseInt(process.env.PORT, 10),
    logs: {
        level: process.env.LOG_LEVEL || "silly",
    },
    api: {
        prefix: "/api/v1",
    },
    jwtSecret: process.env.JWT_SECRET,
};
//# sourceMappingURL=index.js.map