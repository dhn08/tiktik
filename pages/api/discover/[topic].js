import client from "../../../utils/client";
import { topicPostsQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  const { topic } = req.query;
  if (req.method === "GET") {
    try {
      const query = topicPostsQuery(topic);
      const data = await client.fetch(query);
      res.status(200).json(data);
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
