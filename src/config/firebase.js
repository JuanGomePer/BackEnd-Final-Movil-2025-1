var admin = require("firebase-admin");
var serviceAccount = require("../../serviceKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://final-movil-2025-1-default-rtdb.firebaseio.com/"
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
}

const db = admin.database();

module.exports = { db, admin };
