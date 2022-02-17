import { NextApiHandler } from "next";
import words from "../../data/words/words.json";

const dict: NextApiHandler = (req, res) => {
  return res.status(200).json(words);
}

export default dict;
