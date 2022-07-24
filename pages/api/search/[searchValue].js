import client from "../../../utils/client";
import { searchPostsQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  const { searchValue } = req.query;
  if (req.method === "GET") {
    try {
      const vedioQuery = searchPostsQuery(searchValue);
      const vedios = await client.fetch(vedioQuery);
      res.status(200).json(vedios);
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
