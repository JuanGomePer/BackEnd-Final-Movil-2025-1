const { storage } = require('../config/firebase.js');

const savePhoto = async (fileBuffer, roomId, userId) => {
  const file = storage.bucket().file(`photos/${roomId}/${userId}.jpg`);
  await file.save(fileBuffer, {
    metadata: { contentType: 'image/jpeg' }
  });
  return file.publicUrl();
};

module.exports = { savePhoto };
