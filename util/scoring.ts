import {computeClickCounts, countDuplicateLetters} from "./letters";

export function pointsLeftAfterUse(useCount: number) {
  if (useCount == 0) {
    return 5;
  } else if (useCount == 1) {
    return 3;
  } else if (useCount == 2) {
    return 1;
  } else {
    return 0;
  }
}

export function countLetters(wordList: string[]): {[letter: string]: number} {
  const letterCounts = {}
  wordList.map(word => {
    word.split("").map(letter => {
      letterCounts[letter] = letterCounts[letter] + 1 || 1;
    });
  });
  return letterCounts;
}

/**
 * Scoring is as follows:
 * - 2 points for each word.
 * - 9 bonus points for a yarugo.
 * - For each letter used:
 *   - 5 points for the first use.
 *   - 3 points for the second use.
 *   - 1 point for the third use.
 *   - 0 points after that.
 */
export function computeScoreFromWordList(wordList: string[]) {
  var score = 2 * wordList.length;
  for (const word of wordList) {
    if (isYarugo(word)) {
      score = score + 9;
    }
  }

  const letterCounts = countLetters(wordList);
  for (const count of Object.values(letterCounts)) {
    score = score + pointsForCount(count);
  }

  return score;
}

function isYarugo(word: string) {
  if (word.length == 9) {
    const letterCounts = countLetters([word]);
    if (Object.keys(letterCounts).length == 9) {
      return true;
    }
  }
  return false;
}

function pointsForCount(count: number) {
  if (count >= 3) {
    return 9;
  } else if (count == 2) {
    return 8;
  } else if (count == 1) {
    return 5;
  } else {
    return 0;
  }
}
