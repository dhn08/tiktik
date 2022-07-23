import client from "../../utils/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const user = req.body;
      console.log(user);
      await client
        .createIfNotExists(user)
        .then(() => res.status(200).json("Login success"));
    } catch (error) {
      res.status(200).json({ msg: error.message });
    }
  }
}
