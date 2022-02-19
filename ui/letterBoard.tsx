import {ArrowLeftIcon, CheckIcon} from "@chakra-ui/icons";
import BestDisplay from "./best";
import {
  Button,
  createStandaloneToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {computeClickCounts} from "../util/letters";
import {computeScoreFromWordList} from "../util/scoring";
import LetterButton from "./letter";
import React from "react";
import SuccessModal from "./success";
import WordDisplay from "./wordDisplay";
import WordList from "./wordList";
import dictionary from "../data/words/words.json";

type LetterBoardProps = {
  board: string,
};

type LetterBoardState = {
  enteredWords: string[],
  activeWord: string,
  clickCounts: {[key: string]: number},
  bestWords: string[],
  isSuccessOpen: boolean,
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
      bestWords: [],
      isSuccessOpen: false,
    };
  }

  render() {
    const isComplete = this.isGameComplete();
    const activeWordOrSuccess =
      isComplete
      ? "You did it!"
      : this.state.activeWord;

    return (
      <Grid templateColumns="3fr 2fr" gap={1} margin={2}>
          <GridItem>
              <Grid templateColumns="1fr 1fr 1fr" gap={1}>
                  {this.props.board.split('').map((ch, index) => {
                    return (
                      <GridItem
                                key={index}
                      >
                          <LetterButton
                            letter={ch}
                            useCount={this.state.clickCounts[ch] || 0}
                            isGameComplete={isComplete}
                            onClick={(ch) => this.handleLetterClick(ch)}
                          />
                      </GridItem>
                    );
                  })}

                  <GridItem colSpan={2} rowSpan={2}>
                      <WordDisplay word={activeWordOrSuccess} highlight={isComplete} />
                  </GridItem>
                  <GridItem textAlign="center">
                      <Button h="100%"
                              onClick={() => this.handleDeleteLetter()}
                              title="Delete"
                      >
                          <ArrowLeftIcon />
                      </Button>
                  </GridItem>
                  <GridItem textAlign="center">
                      <Button h="100%"
                              onClick={() => this.handleEnter()}
                              title="Enter"
                      >
                          <CheckIcon />
                      </Button>
                  </GridItem>
              </Grid>
          </GridItem>
          <GridItem>
              <WordList
                words={this.state.enteredWords}
                onRemoveWord={(removed: string) => this.handleRemoveWord(removed)}
              />
          </GridItem>

          <GridItem w="100%" h="100%" colSpan={2}>
              <BestDisplay
                words={this.state.bestWords}
                onClick={() => {
                  this.setState({isSuccessOpen: true});
                }}
              />
          </GridItem>

          <SuccessModal
            words={this.state.bestWords}
            isOpen={this.state.isSuccessOpen}
            onClose={() => this.handleSuccessModalClosed()}
          />
      </Grid>
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
          const isComplete = Object.keys(clickCounts).length == 9;
          var bestWords = this.state.bestWords;
          if (isComplete) {
            const prevBestScore = computeScoreFromWordList(this.state.bestWords);
            const currScore = computeScoreFromWordList(newEnteredWords);
            if (currScore > prevBestScore) {
              bestWords = newEnteredWords;
            }
          }
          this.setState({
            activeWord: '',
            clickCounts,
            enteredWords: newEnteredWords,
            bestWords,
            isSuccessOpen: isComplete,
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

  handleSuccessModalClosed() {
    this.setState({
      isSuccessOpen: false,
    });
  }

  isGameComplete() {
    return Object.keys(this.state.clickCounts).length == 9 && this.state.activeWord.length == 0;
  }
};

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
