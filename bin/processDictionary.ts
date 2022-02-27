/**
 * Script for processing the input dictionary and local word lists to produce the final dictionary.
 *
 * Run at the top-level with a command like:
 *
 *   build-dictionary -d lib/data/dictionary/en_US-large.txt -o lib/data/words.json -p lib/data/puzzles-out.json
 *
 */

const {createReadStream, createWriteStream, writeFileSync} = require("fs");
const {createInterface} = require("readline");
const {hideBin} = require("yargs/helpers");
const {shuffle, shuffleString} = require("../util/letters");
const yargs = require("yargs");
const yarugoWords = require("../data/words/customWords.json");

/**
 * Returns true if word is a legal one for our game.
 *
 * This filters out proper names, words containing punctuation or numbers/symbols.
 */
function isLegalWord(word: string) {
  return /^[a-z]+$/.test(word);
}

class WordTracker {
  numInput = 0;
  numIllegal = 0;
  yarugoMap: {[key: string]: string[]} = {};
};

async function processGenericDictionary(
  genericDictFilename: string,
  outputJsonFilename: string,
) {
  const tracker = new WordTracker();

  const outputStream = createWriteStream(outputJsonFilename);
  outputStream.write("[\n");

  const inputStream = createReadStream(genericDictFilename);
  const reader = createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  for await(const line of reader) {
    tracker.numInput = tracker.numInput + 1;
    if (isLegalWord(line)) {
      outputStream.write(`  "${line}",\n`);
      if (line.length == 9) {
        // Possible yarugo.
        const letterSet = new Set(line.split(""));
        if (letterSet.size == 9) {
          // Got one!
          const sortedLetters = Array.from(letterSet.keys()).sort().join("");
          const matchingWords = tracker.yarugoMap[sortedLetters] || [];
          const newMatchingWords = matchingWords.concat(line);
          tracker.yarugoMap[sortedLetters] = newMatchingWords;
        }
      }
    } else {
      tracker.numIllegal = tracker.numIllegal + 1;
    }
  }

  outputStream.write("  ");
  outputStream.write(yarugoWords.map((word: string) => `"${word}"`).join(",\n  "));
  outputStream.write("\n]\n");
  outputStream.close();

  return tracker;
}

function writePuzzles(filename: string, puzzleMap: {[key: string]: string[]}) {
  const puzzles = shuffle(Object.entries(puzzleMap));
  const randomizedPuzzles = puzzles.map(([board, yarugos]) => [shuffleString(board), yarugos]);
  writeFileSync(filename, JSON.stringify(randomizedPuzzles, null, 1));
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .alias("d", "genericDict")
    .nargs("d", 1)
    .describe("d", "Filename with the generic massive dictionary.")

    .alias("o", "outputDict")
    .nargs("o", 1)
    .describe("o", "Filename to which we write filtered words as JSON.")

    .alias("p", "outputPuzzles")
    .nargs("p", 1)
    .describe("p", "Filename to which we write the puzzle data as JSON.")

    .demandOption(["d", "o", "p"])
    .argv;

  const tracker = await processGenericDictionary(
    argv.genericDict,
    argv.outputDict,
  )

  writePuzzles(argv.outputPuzzles, tracker.yarugoMap);

  const numYarugo = Object.keys(tracker.yarugoMap).length;
  console.log(`Processed ${tracker.numInput} words, skipping ${tracker.numIllegal} and finding ${numYarugo} yarugos.`);
}

main();
