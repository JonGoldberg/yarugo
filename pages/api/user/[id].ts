import { NextApiHandler } from "next";
import users from "../../../lib/data/users.json";

const user: NextApiHandler = (req, res) => {
  const { id } = req.query;
  const userData = users.find(userObj => String(userObj.id) === String(id))

  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404).send("No user found.");
  }
}

export default user;
