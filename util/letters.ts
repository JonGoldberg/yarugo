export function computeClickCounts(enteredWords: string[], activeWord: string) {
  var clickCounts = {};
  for (const word of enteredWords) {
    addLetterCounts(clickCounts, word);
  }
  addLetterCounts(clickCounts, activeWord);
  return clickCounts;
}

function addLetterCounts(counter: {[key: string]: number}, word: string) {
  for (const ch of word) {
    counter[ch] = (counter[ch] || 0) + 1;
  }
}

export function countDuplicateLetters(clickCounts: {[key: string]: number}) {
  var duplicateLetterCount = 0;
  for (const count of Object.values(clickCounts)) {
    if (count > 1) {
      duplicateLetterCount = duplicateLetterCount + (count-1);
    }
  }
  return duplicateLetterCount;
}
