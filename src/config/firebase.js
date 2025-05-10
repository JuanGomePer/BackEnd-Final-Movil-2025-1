const admin = require("firebase-admin");
const { getDatabase } = require("firebase-admin/database");
const { getStorage } = require("firebase-admin/storage");

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = getDatabase();
const bucket = getStorage().bucket();

module.exports = { admin, db, bucket };
