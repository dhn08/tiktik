import axios from "axios";
import jwt_decode from "jwt-decode";
export const createOrGetUser = async (response, addUser) => {
  const { name, picture, sub } = jwt_decode(response.credential);
  console.log(name, picture, sub);
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  await axios.post("/api/auth", user);
  addUser(user);
};
