import { NextApiHandler } from "next";
import currentGame from "../../data/currentGame.json";
import puzzles from "../../data/puzzles.json";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const dict: NextApiHandler = (req, res) => {
  const westCoastNow = new Date(
    new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})).getTime();
  const puzzleIndexDate = new Date(
    new Date(currentGame.puzzleIndexDate)
      .toLocaleString("en-US", {timeZone: "America/Los_Angeles"})).getTime();

  const daysSincePuzzleIndex = Math.floor((westCoastNow - puzzleIndexDate) / MS_PER_DAY)
  const currPuzzleIndex = currentGame.puzzleIndex + daysSincePuzzleIndex;
  const currPuzzleDateString = getDateString(puzzleIndexDate, daysSincePuzzleIndex);
  const lastPuzzleDateString = getDateString(puzzleIndexDate, daysSincePuzzleIndex-1);

  return res.status(200).json({
    date: currPuzzleDateString,
    board: puzzles[currPuzzleIndex][0],
    lastBoardDate: lastPuzzleDateString,
    lastBoard: puzzles[currPuzzleIndex-1][0],
    lastYarugos: puzzles[currPuzzleIndex-1][1],
  });
}

function pad(num: number) {
  return String(num).padStart(2, "0");
}

function getDateString(startDateMs: number, daysAfter: number) {
  const dateObj = new Date(startDateMs + (daysAfter * MS_PER_DAY));
  const dateString = `${dateObj.getUTCFullYear()}-${pad(dateObj.getUTCMonth()+1)}-${pad(dateObj.getUTCDate())}`;
  return dateString;
}

export default dict;
