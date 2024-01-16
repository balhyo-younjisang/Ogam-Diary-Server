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
const firebase_1 = require("../config/firebase");
const firestore_1 = require("firebase/firestore");
const typedi_1 = require("typedi");
let DiaryService = class DiaryService {
    constructor(logger) {
        this.logger = logger;
    }
    async getListView(email, date) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.database, email));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const diaryList = new Array();
            querySnapshot.forEach((doc) => {
                const writedDate = new Date(doc.data().date.toDate());
                if (writedDate.getFullYear() === date.getFullYear() &&
                    writedDate.getMonth() === date.getMonth() &&
                    writedDate.getDate() === date.getDate()) {
                    diaryList.push(Object.assign({ id: doc.id }, doc.data()));
                }
            });
            return diaryList;
        }
        catch (e) {
            throw e;
        }
    }
    async addDiary({ email, situation, think, emotion, reaction, action, date, }) {
        try {
            const convertDate = new Date(date);
            const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.database, email), {
                situation,
                think,
                emotion,
                reaction,
                action,
                convertDate,
            });
            return docRef.id;
        }
        catch (e) {
            throw e;
        }
    }
    async getDiary(email, diaryId) {
        try {
            const diary = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.database, email, diaryId));
            return Object.assign({ id: diary.id }, diary.data());
        }
        catch (e) {
            throw e;
        }
    }
    async editDiary({ email, diaryId, situation, think, emotion, reaction, action, date, }) {
        try {
            const convertDate = new Date(date);
            const diary = (0, firestore_1.doc)(firebase_1.database, email, diaryId);
            await (0, firestore_1.updateDoc)(diary, {
                situation,
                think,
                emotion,
                reaction,
                action,
                convertDate,
            });
            const updatedDiary = await (0, firestore_1.getDoc)(diary);
            return updatedDiary;
        }
        catch (e) {
            throw e;
        }
    }
    async deleteDiary(email, diaryId) {
        try {
            await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.database, email, diaryId));
        }
        catch (e) {
            throw e;
        }
    }
};
DiaryService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("logger")),
    __metadata("design:paramtypes", [Object])
], DiaryService);
exports.default = DiaryService;
//# sourceMappingURL=diary.js.map