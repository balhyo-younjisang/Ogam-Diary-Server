"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diary_1 = __importDefault(require("../../services/diary"));
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/diary", route);
    route.get("/list/:date", async (req, res, next) => {
        const diaryInstance = typedi_1.default.get(diary_1.default);
        const { date } = req.params;
        const { email } = req.body;
        if (!email)
            return res.json({ msg: "Email is null" }).status(500);
        const diaryList = await diaryInstance.getListView(email, new Date(date));
        return res.json({ diaryList }).status(200);
    });
    route.post("/write", async (req, res) => {
        const diaryInstance = typedi_1.default.get(diary_1.default);
        const { email, situation, think, emotion, reaction, action, date } = req.body;
        if (!email)
            return res.json({ msg: "Email is null" }).status(500);
        if (!email ||
            !situation ||
            !think ||
            !emotion ||
            !reaction ||
            !action ||
            !date) {
            return res.json({ msg: "일기 내용이 비어있으면 안돼용" }).status(500);
        }
        const diary = await diaryInstance.addDiary({
            email,
            situation,
            think,
            emotion,
            reaction,
            action,
            date,
        });
        return res.json({ diary }).status(200);
    });
    route.get("/view/:id", async (req, res) => {
        const diaryInstance = typedi_1.default.get(diary_1.default);
        const { email } = req.body;
        const { id } = req.params;
        if (!email)
            return res.json({ msg: "Email is null" }).status(500);
        const diary = await diaryInstance.getDiary(email, id);
        return res.json({ diary }).status(200);
    });
    route.patch("/edit/:diaryId", async (req, res) => {
        const diaryInstance = typedi_1.default.get(diary_1.default);
        const { email, situation, think, emotion, reaction, action, date } = req.body;
        const { diaryId } = req.params;
        if (!email)
            return res.json({ msg: "Email is null" }).status(500);
        const diary = await diaryInstance.editDiary({
            email,
            diaryId,
            situation,
            think,
            emotion,
            reaction,
            action,
            date,
        });
        return res.json({ diary }).status(200);
    });
    route.delete("/delete/:id", async (req, res) => {
        const diaryInstance = typedi_1.default.get(diary_1.default);
        const { email } = req.body;
        const { id } = req.params;
        if (!email)
            return res.json({ msg: "Email is null" }).status(500);
        await diaryInstance.deleteDiary(email, id);
        return res.status(200);
    });
};
//# sourceMappingURL=diary.js.map