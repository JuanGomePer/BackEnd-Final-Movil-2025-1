const voteService = require("../services/voteService");

const votePhoto = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { photoId } = req.body;

    if (!photoId) {
      return res.status(400).json({ error: "Missing photoId" });
    }

    await voteService.votePhoto(roomId, photoId);
    res.status(200).json({ message: "Vote recorded" });
  } catch (error) {
    res.status(500).json({ error: "Error voting photo" });
  }
};

const getWinner = async (req, res) => {
  try {
    const { roomId } = req.params;
    const winner = await voteService.getWinner(roomId);
    if (!winner) return res.status(404).json({ error: "No winner found" });
    res.json(winner);
  } catch (error) {
    res.status(500).json({ error: "Error getting winner" });
  }
};

module.exports = { votePhoto, getWinner };
