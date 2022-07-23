import client from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const query = allPostsQuery();
      const data = await client.fetch(query);
      res.status(200).json({ data });
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const document = req.body;
      await client
        .create(document)
        .then(() => res.status(201).json("post created"));
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
