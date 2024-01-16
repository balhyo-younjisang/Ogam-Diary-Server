"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.database = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};
const firebase = (0, app_1.initializeApp)(firebaseConfig);
exports.database = (0, firestore_1.getFirestore)(firebase);
exports.auth = (0, auth_1.getAuth)(firebase);
//# sourceMappingURL=firebase.js.map