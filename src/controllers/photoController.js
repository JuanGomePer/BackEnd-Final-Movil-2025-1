const photoService = require("../services/photoService");

const uploadPhoto = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId, imageBase64 } = req.body;

    if (!userId || !imageBase64) {
      return res.status(400).json({ error: "Missing userId or imageBase64" });
    }

    const photoUrl = await photoService.savePhoto(roomId, userId, imageBase64);
    res.status(201).json({ photoUrl });
  } catch (error) {
    res.status(500).json({ error: "Error uploading photo" });
  }
};

const getPhotos = async (req, res) => {
  try {
    const { roomId } = req.params;
    const photos = await photoService.getPhotos(roomId);
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Error getting photos" });
  }
};

module.exports = { uploadPhoto, getPhotos };
