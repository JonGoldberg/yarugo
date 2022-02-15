import {Alert, AlertTitle, createStandaloneToast, Flex, Text} from "@chakra-ui/react";
import ControlBoard from "./controlBoard";
import LetterGrid from "./letterGrid";
import React from "react";
import WordDisplay from "./wordDisplay";
import WordList from "./wordList";
import dictionary from "../lib/data/words.json";

type LetterBoardProps = {
  board: string,
};

type LetterBoardState = {
  enteredWords: string[],
  activeWord: string,
  clickCounts: {[key: string]: number},
};

class LetterBoard extends React.Component<LetterBoardProps, LetterBoardState> {
  wordSet: Set<string>;
  invalidGuesses: {[key: string]: number};

  constructor(props: LetterBoardProps) {
    super(props);
    this.wordSet = new Set(dictionary);
    this.invalidGuesses = {};
    this.state = {
      clickCounts: {},
      enteredWords: [],
      activeWord: '',
    };
  }

  render() {
    const isComplete = this.isGameComplete();
    const activeWordOrSuccess =
      isComplete
      ? "You did it!"
      : this.state.activeWord;

    return (
      <Flex flexDirection="row">
          <Flex flexDirection="column">
              <LetterGrid
                board={this.props.board}
                clickCounts={this.state.clickCounts}
                onLetterClick={(ch) => this.handleLetterClick(ch)}
                isGameComplete={this.isGameComplete()}
              />
              <WordDisplay word={activeWordOrSuccess} highlight={isComplete} />
              <ControlBoard
                isComplete={isComplete}
                clickCounts={this.state.clickCounts}
                totalWordsUsed={this.state.enteredWords.length}
                onEnterClick={() => this.handleEnter()}
                onDeleteClick={() => this.handleDeleteLetter()} />
          </Flex>
          <Flex>
              <WordList
                words={this.state.enteredWords}
                onRemoveWord={(removed: string) => this.handleRemoveWord(removed)}
              />
          </Flex>
      </Flex>
    );
  }

  handleLetterClick(letter: string) {
    const newActiveWord = this.state.activeWord + letter;
    this.setState({
      clickCounts: computeClickCounts(this.state.enteredWords, newActiveWord),
      activeWord: newActiveWord,
    });
  }

  handleEnter() {
    const word = this.state.activeWord;
    if (word.length > 0) {
      const isValidWord = this.wordSet.has(word.toLowerCase());
      if (isValidWord) {
        const isNewWord = this.state.enteredWords.indexOf(word) === -1;
        if (isNewWord) {
          const newEnteredWords = [...this.state.enteredWords, word];
          const clickCounts = computeClickCounts(newEnteredWords, '');
          this.setState({
            activeWord: '',
            clickCounts,
            enteredWords: newEnteredWords,
          });
        } else {
          const clickCounts = computeClickCounts(this.state.enteredWords, '');
          this.setState({
            activeWord: '',
            clickCounts,
          });
        }
      } else {
        const invalidGuessCount = (this.invalidGuesses[word] || 0) + 1;
        this.invalidGuesses[word] = invalidGuessCount;
        this.setState({
          activeWord: '',
          clickCounts: computeClickCounts(this.state.enteredWords, ''),
        });

        const toastId = 'invalid-word';
        const toast = createStandaloneToast();
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            title: getInvalidWordString(invalidGuessCount),
            status: "warning",
            duration: 3000,
            position: "top",
          });
        }
      }
    }
  }

  handleDeleteLetter() {
    if (this.state.activeWord.length > 0) {
      const newActiveWord = this.state.activeWord.slice(0, -1);
      this.setState({
        activeWord: newActiveWord,
        clickCounts: computeClickCounts(this.state.enteredWords, newActiveWord),
      });
    }
  }

  handleRemoveWord(removed: string) {
    const newEnteredWords = this.state.enteredWords.filter(word => word !== removed);
    this.setState({
      enteredWords: newEnteredWords,
      clickCounts: computeClickCounts(newEnteredWords, this.state.activeWord),
    });
  }

  isGameComplete() {
    return Object.keys(this.state.clickCounts).length == 9 && this.state.activeWord.length == 0;
  }
};

function computeClickCounts(enteredWords: string[], activeWord: string) {
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

/**
 * Return a sassy string for the number of times they guessed the same word.
 */
function getInvalidWordString(guessCount: number) {
  if (guessCount == 1) {
    return "I don't know that word";
  } else if (guessCount == 2) {
    return "Again?";
  } else if (guessCount == 3) {
    return "C'mon";
  } else {
    return "Still no, sorry";
  }
}

export default LetterBoard;
