import client from "../../utils/client";
import { uuid } from "uuidv4";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { userId, postId, like } = req.body;
    // await client
    //   .delete(postId)
    //   .then(() => res.status(200).json("post deleted"))
    //   .catch((err) => {
    //     res.status(200).json({ msg: err.message });
    //   });
    const data = like
      ? await client
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert("after", "likes[-1]", [{ _ref: userId }])
          .commit({
            // Adds a `_key` attribute to array items, unique within the array, to
            // ensure it can be addressed uniquely in a real-time collaboration context
            autoGenerateArrayKeys: true,
          })
      : await client
          .patch(postId)
          .unset([`likes[_ref=="${userId}"]`])
          .commit();
    res.status(200).json(data);
  }
}
