const { db } = require ('../config/firebase.js');
const { ref, update, get } = require ('firebase-admin/database');

const submitVote = async (roomId, voterId, targetUserId) => {
  const voteRef = ref(db, `rooms/${roomId}/votes/${voterId}`);
  await update(voteRef, { votedFor: targetUserId });
};

const calculateWinner = async (roomId) => {
  const votesSnap = await get(ref(db, `rooms/${roomId}/votes`));
  const votes = votesSnap.val();
  const tally = {};

  Object.values(votes).forEach(v => {
    if (!tally[v.votedFor]) tally[v.votedFor] = 0;
    tally[v.votedFor]++;
  });

  let winner = null, maxVotes = 0;
  for (const [userId, count] of Object.entries(tally)) {
    if (count > maxVotes) {
      maxVotes = count;
      winner = userId;
    }
  }

  return { winner, maxVotes };
};

module.exports = {
  submitVote,
  calculateWinner
};
