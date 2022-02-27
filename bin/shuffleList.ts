/**
 * Script to read in a JSON list and shuffle the order before writing it back out.
 */
const {hideBin} = require("yargs/helpers");
const {readFileSync, writeFileSync} = require("fs");
const yargs = require("yargs");

function shuffle(array: any[]) {
  for (var i = array.length-1; i > 0; i--) {
    // Pick a random destination for the ith element.
    const j = Math.floor(Math.random() * (i+1));

    // Swap the two elements.
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function main() {
  const argv = yargs(hideBin(process.argv))
    .alias("i", "input")
    .nargs("i", 1)
    .describe("i", "Filename from which we read the list as JSON.")

    .alias("o", "output")
    .nargs("o", 1)
    .describe("o", "Filename to which we write the shuffled list as JSON.")

    .demandOption(["i", "o"])
    .argv;

  const inputList = JSON.parse(readFileSync(argv.input));
  const outputList = shuffle(inputList);
  console.log(`Shuffled ${outputList.length} puzzles.`);
  writeFileSync(argv.output, JSON.stringify(outputList, null, 1));
}

main();

