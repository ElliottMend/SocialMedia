import { pool } from "../../app";

export const followingDataModel = async (username: string) => {
  const selectQuery = {
    text:
      "\
        SELECT ua.username, ua.location, up.photo, up.bio\
        FROM user_account AS ua\
        LEFT JOIN follows AS f ON f.follower_user_id = ua.user_id\
        RIGHT JOIN user_profile AS up ON up.user_id = f.follower_user_id\
        WHERE ua.username = $1\
        ",
    values: [username],
  };
  const data = await pool.query(selectQuery);
  return data.rows;
};
