interface Puzzle {
  id: string;
  dateString: string;
  board: string;
}

interface CurrentPlayState {
  puzzleDateString: string;
  activeWords: string[];
}

interface ResultHistory {
  [puzzleDate: string]: string[]
}
