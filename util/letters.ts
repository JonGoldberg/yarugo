export function computeClickCounts(
  enteredWords: string[],
  activeWord: string): {[letter:string]: number}
{
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

export function shuffle(array: any[]) {
  for (var i = array.length-1; i > 0; i--) {
    // Pick a random destination for the ith element.
    const j = Math.floor(Math.random() * (i+1));

    // Swap the two elements.
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleString(str: string) {
  return shuffle(str.split("")).join("");
}
