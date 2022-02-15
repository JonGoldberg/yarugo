import { NextApiHandler } from "next";
import boards from "../../../lib/data/puzzles.json";

const board: NextApiHandler = (req, res) => {
  const { id } = req.query;
  const boardData = boards.find(boardObj => String(boardObj.id) === String(id));

  if (boardData) {
    res.status(200).json(boardData);
  } else {
    res.status(404).send("No puzzle found.");
  }
}

export default board;
