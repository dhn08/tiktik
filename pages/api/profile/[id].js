import client from "../../../utils/client";
import {
  singleUserQuery,
  userLikedPostsQuery,
  user,
  userCreatedPostsQuery,
} from "../../../utils/queries";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const userquery = singleUserQuery(id);
      const uservidioQuery = userCreatedPostsQuery(id);
      const userLikedVideoquery = userLikedPostsQuery(id);
      const data = await client.fetch(userquery);
      const userVideo = await client.fetch(uservidioQuery);
      const likedVideo = await client.fetch(userLikedVideoquery);

      res.status(200).json({ data, userVideo, likedVideo });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
