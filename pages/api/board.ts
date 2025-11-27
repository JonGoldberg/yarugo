import { NextApiHandler } from "next";
import currentGame from "../../data/currentGame.json";
import puzzles from "../../data/puzzles.json";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const board: NextApiHandler = (req, res) => {
  const todayInSF = getDateString(0);
  const yesterdayInSF = getDateString(1);

  const daysSincePuzzleIndex = Math.floor(
    (Date.parse(todayInSF) - Date.parse(currentGame.puzzleIndexDate)) / MS_PER_DAY)

  const totalPuzzleCount = puzzles.length;
  const currPuzzleIndex = (currentGame.puzzleIndex + daysSincePuzzleIndex) % totalPuzzleCount;
  const lastPuzzleIndex = currPuzzleIndex === 0 ? totalPuzzleCount - 1 : currPuzzleIndex - 1;

  return res.status(200).json({
    date: todayInSF,
    board: puzzles[currPuzzleIndex][0],
    lastBoardDate: yesterdayInSF,
    lastBoard: puzzles[lastPuzzleIndex][0],
    lastYarugos: puzzles[lastPuzzleIndex][1],
  });
}

function getDateString(daysAgo: number) {
  const mmddyyString = new Date(
    Date.now() - (daysAgo * MS_PER_DAY))
    .toLocaleDateString("en-GB", {timeZone: "America/Los_Angeles"});
  const splits = mmddyyString.split("/");
  return `${splits[2]}-${splits[1]}-${splits[0]}`;
}

export default board;
