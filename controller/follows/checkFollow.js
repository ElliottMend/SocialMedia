const interactionID = require("../interactionId");
const checkFollow = async (req, res, next) => {
  const userId = await interactionID(req.body.user);
  const ob = {
    followers: userId.followers,
    following: userId.following,
    followingUsers: userId.followingUsers,
    followerUsers: userId.followerUsers,
  };
  res.send(ob);
};
module.exports = checkFollow;