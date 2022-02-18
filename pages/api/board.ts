import { NextApiHandler } from "next";
import currentGame from "../../data/currentGame.json";
import puzzles from "../../data/puzzles.json";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const dict: NextApiHandler = (req, res) => {
  const puzzleIndexDate = Date.parse(currentGame.puzzleIndexDate);
  const now = Date.now();
  const daysSincePuzzleIndex = Math.floor((now - puzzleIndexDate) / MS_PER_DAY)
  const currPuzzleIndex = currentGame.puzzleIndex + daysSincePuzzleIndex;
  const currPuzzleDate = new Date(puzzleIndexDate + (daysSincePuzzleIndex * MS_PER_DAY));
  const currPuzzleDateString = `${currPuzzleDate.getUTCFullYear()}-${pad(currPuzzleDate.getUTCMonth()+1)}-${pad(currPuzzleDate.getUTCDate())}`;

  return res.status(200).json({
    date: currPuzzleDateString,
    board: puzzles[currPuzzleIndex][0],
    lastBoard: puzzles[currPuzzleIndex-1][0],
    lastYarugos: puzzles[currPuzzleIndex-1][1],
  });
}

function pad(num: number) {
  return String(num).padStart(2, "0");
}

export default dict;
