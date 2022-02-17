import { NextApiHandler } from "next";
import currentGame from "../../data/currentGame.json";
import puzzles from "../../data/puzzles.json";

const dict: NextApiHandler = (req, res) => {
  return res.status(200).json({
    date: currentGame.date,
    board: puzzles[currentGame.puzzleIndex][0],
  });
}

export default dict;
