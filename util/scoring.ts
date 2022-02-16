import {computeClickCounts, countDuplicateLetters} from "./letters";

export function computeScoreFromWordList(wordList: string[]) {
  const totalWords = wordList.length;
  if (totalWords == 0) {
    return 0;
  }
  const clickCounts = computeClickCounts(wordList, '');
  const duplicateLetterCount = countDuplicateLetters(clickCounts);
  return computeScore(totalWords, duplicateLetterCount);
}

export function computeScore(
  totalWordsUsed: number,
  duplicateLetterCount: number,
) {
  var score = 100;

  // Take off 10 points for every word past 1.
  if (totalWordsUsed > 1) {
    score = score - ((totalWordsUsed - 1) * 10);
  }

  // Take off 5 points for every extra use of a letter.
  score = score - (duplicateLetterCount * 5);
  return score;
}

export function computeGradeString(score: number) {
  if (score == 100) {
    return 'A+';
  } else if (score < 60) {
    return 'F';
  } else {
    const gradeThresholds = {
      90: 'A',
      80: 'B',
      70: 'C',
      60: 'D',
    };
    const majorGrade = gradeThresholds[Math.floor(score/10) * 10];
    const minorGrade = (score % 10) < 3 ? '-' : (score % 10) > 6 ? '+' : '';
    return `${majorGrade}${minorGrade}`;
  }
}
