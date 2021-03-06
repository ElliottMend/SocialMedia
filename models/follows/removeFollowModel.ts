import { pool } from "../../app";

export const removeFollowModel = async (
  user_id: number,
  followingUser: number
) => {
  const insertFollowQuery = {
    text:
      "\
        DELETE FROM follows WHERE following_user_id = $2 AND follower_user_id = $1\
        ",
    values: [user_id, followingUser],
  };
  const updateFollowingQuery = {
    text:
      "\
        UPDATE user_profile\
            SET followers = followers - 1\
                WHERE user_id = $1\
        UPDATE user_profile\
            SET following = following - 1\
                WHERE user_id = $2\
        ",
    values: [followingUser, user_id],
  };
  await pool.query(insertFollowQuery);
  await pool.query(updateFollowingQuery);
  return;
};
