// src/controllers/photoController.js
const { db } = require('../config/firebase.js');
const { savePhoto } = require('../services/photoService');

const uploadPhoto = async (req, res) => {
  const { roomId } = req.params;
  const { userId, imageBase64 } = req.body;

  if (!userId || !imageBase64) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const userSnap = await db.ref(`rooms/${roomId}/players/${userId}`).get();
  const userData = userSnap.exists() ? userSnap.val() : { userId };

  const buffer = Buffer.from(imageBase64, 'base64');
  const photoUrl = await savePhoto(buffer, roomId, userId);

  await db.ref(`rooms/${roomId}/photos/${userId}`).set({
    userId,
    username: userData.username || '',
    userPhoto: userData.userPhoto || '',
    photoUrl
  });

  res.json({ photoUrl });
};

const getPhotos = async (req, res) => {
  const { roomId } = req.params;
  const snap = await db.ref(`rooms/${roomId}/photos`).get();
  res.json(snap.exists() ? Object.values(snap.val()) : []);
};

module.exports = { uploadPhoto, getPhotos };
