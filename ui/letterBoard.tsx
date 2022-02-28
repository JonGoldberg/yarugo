import {addToHistory, getCurrentPlay, getHistory, setCurrentPlay} from "../store/store";
import {ArrowLeftIcon, CheckIcon, RepeatIcon} from "@chakra-ui/icons";
import BestDisplay from "./best";
import {
  Button,
  createStandaloneToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {computeClickCounts, shuffleString} from "../util/letters";
import {computeScoreFromWordList} from "../util/scoring";
import LetterButton from "./letter";
import React from "react";
import SuccessModal from "./success";
import WordDisplay from "./wordDisplay";
import WordList from "./wordList";
import dictionary from "../data/words/words.json";

type LetterBoardProps = {
  board: string,
  puzzleDate: string,
};

type LetterBoardState = {
  enteredWords: string[],
  activeWord: string,
  clickCounts: {[key: string]: number},
  currentBoard: string,
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
    const savedPlayState = getCurrentPlay();
    const enteredWords =
      (savedPlayState && savedPlayState.puzzleDateString == props.puzzleDate)
      ? savedPlayState.activeWords
      : [];

    const history = getHistory() || {};
    const bestWords = history[props.puzzleDate] || [];

    const clickCounts = computeClickCounts(enteredWords, '');

    this.state = {
      currentBoard: this.props.board,
      clickCounts,
      enteredWords,
      activeWord: '',
      bestWords,
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
      <Grid textAlign="center" templateColumns="2fr 3fr" gap={1} margin={2}>
          <GridItem>
              <Grid templateColumns="1fr 1fr 1fr" gap={1}>
                  {this.state.currentBoard.split('').map((ch, index) => {
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

                  <GridItem textAlign="center">
                      <Button colorScheme="green"
                              h="100%"
                              onClick={() => this.handleDeleteLetter()}
                              title="Delete"
                      >
                          <ArrowLeftIcon />
                      </Button>
                  </GridItem>
                  <GridItem textAlign="center">
                      <Button colorScheme="green"
                              h="100%"
                              title="Rotate"
                              onClick={() => this.handleRotate()}>
                          <RepeatIcon />
                      </Button>
                  </GridItem>
                  <GridItem textAlign="center">
                      <Button colorScheme="green"
                              h="100%"
                              onClick={() => this.handleEnter()}
                              title="Enter"
                      >
                          <CheckIcon />
                      </Button>
                  </GridItem>
                  <GridItem colSpan={3} rowSpan={1}>
                      <WordDisplay word={activeWordOrSuccess} highlight={isComplete} />
                  </GridItem>
              </Grid>
          </GridItem>
          <GridItem>
              <WordList
                words={this.state.enteredWords}
                onRemoveWord={(removed: string) => this.handleRemoveWord(removed)}
              />
          </GridItem>

          <GridItem h="100%" colSpan={2}>
              <BestDisplay
                words={this.state.bestWords}
                onClick={() => {
                  this.setState({isSuccessOpen: true});
                }}
              />
          </GridItem>

          <SuccessModal
            puzzleDate={this.props.puzzleDate}
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

  checkWordValidity(word: string) : {isValidWord: boolean, invalidWordReason?: string} {
    // Only allow words of desired lengths.
    if ([3, 4, 5, 6, 9].indexOf(word.length) == -1) {
      return {
        isValidWord: false,
        invalidWordReason: `Hmph. We aren't looking for ${word.length} letter words.`,
      };
    }

    // Only allow words that are in our dictionary.
    if (! this.wordSet.has(word.toLowerCase())) {
      const invalidGuessCount = (this.invalidGuesses[word] || 0) + 1;
      this.invalidGuesses[word] = invalidGuessCount;
      return {
        isValidWord: false,
        invalidWordReason: getInvalidWordString(invalidGuessCount)
      };
    }

    // Only allow words of each length to be entered once.
    const wordsByLength = {};
    this.state.enteredWords.map(word => wordsByLength[word.length] = word);
    if (word.length in wordsByLength) {
      return {
        isValidWord: false,
        invalidWordReason: `You already have a word with ${word.length} letters.`,
      };
    }
    return {isValidWord: true};
  }

  handleEnter() {
    const word = this.state.activeWord;
    if (word.length == 0) {
      return;
    }

    const {isValidWord, invalidWordReason} = this.checkWordValidity(word);
    if (isValidWord) {
      const newEnteredWords = [...this.state.enteredWords, word];
      const clickCounts = computeClickCounts(newEnteredWords, '');
      var bestWords = this.state.bestWords;
      const prevBestScore = computeScoreFromWordList(this.state.bestWords);
      const currScore = computeScoreFromWordList(newEnteredWords);
      const newPlayState = {
        puzzleDateString: this.props.puzzleDate,
        activeWords: newEnteredWords,
      };
      setCurrentPlay(newPlayState);
      if (currScore > prevBestScore) {
        bestWords = newEnteredWords;
        addToHistory(newPlayState);
      }
      this.setState({
        activeWord: '',
        clickCounts,
        enteredWords: newEnteredWords,
        bestWords,
        isSuccessOpen: newEnteredWords.length == 5,
      });
    } else {
      this.setState({
        activeWord: '',
        clickCounts: computeClickCounts(this.state.enteredWords, ''),
      });

      const toastId = 'invalid-word';
      const toast = createStandaloneToast();
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: invalidWordReason,
          status: "warning",
          duration: 3000,
          position: "top",
        });
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

  handleRotate() {
    const newCurrentBoard = shuffleString(this.state.currentBoard);
    this.setState({
      currentBoard: newCurrentBoard,
    });
  }

  handleRemoveWord(removed: string) {
    const newEnteredWords = this.state.enteredWords.filter(word => word !== removed);
    setCurrentPlay({
      puzzleDateString: this.props.puzzleDate,
      activeWords: newEnteredWords,
    });
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
    return this.state.enteredWords.length == 5;
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
