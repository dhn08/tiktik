import client from "../../../utils/client";
import { allPostsQuery, postDetailQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const query = postDetailQuery(id);
      const data = await client.fetch(query);
      res.status(200).json({ data });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { userId, comment } = req.body;
      const data = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          { postedBy: { _type: "postedBy", _ref: userId }, comment },
        ])
        .commit({
          autoGenerateArrayKeys: true,
        });
      res.status(200).json(data);
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
