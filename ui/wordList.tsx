import {Divider, Grid, GridItem, Square, Text} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

interface WordListProps {
  words: string[];
  onRemoveWord: (word: string) => void;
};

export default function WordList(props: WordListProps) {
  const wordsByLength = {};
  props.words.map(word => wordsByLength[word.length] = word);

  return (
    <Grid templateColumns="1fr 1fr">
        <GridItem colSpan={2} margin={1}>
            <Text fontSize="xl" fontWeight="bold">Your words</Text>
            <Divider  />
        </GridItem>
        {WORD_LAYOUT.map(wordSpec => {
          return (
            <GridItem key={`wordbox-${wordSpec.length}`} colSpan={wordSpec.colSpan} margin={1}>
                <DeleteableWordBox
                  length={wordSpec.length}
                  word={wordsByLength[wordSpec.length]}
                  {...props}
                />
            </GridItem>
          );
        })}
    </Grid>
  );
}


const WORD_LAYOUT = [
  { colSpan: 1, length: 3},
  { colSpan: 1, length: 6},
  { colSpan: 1, length: 4},
  { colSpan: 1, length: 5},
  { colSpan: 2, length: 9},
];

interface DeleteableWordBoxProps extends WordListProps {
  length: number;
  word: string;
};

// fix layout for single word.
function DeleteableWordBox(props: DeleteableWordBoxProps) {
  const paddedWord = props.word || "".padEnd(props.length, " ")
  const lettersArray = paddedWord.split("");
  const visibility = props.word ? "visible" : "hidden";

  return (
    <Grid templateColumns="9fr 1fr">
        <GridItem>
            <Grid templateColumns={`repeat(${props.length}, 1fr)`}>
                {lettersArray.map((letter, index) => {
                  return (
                    <GridItem
                      key={`wordbox-${props.length}-letter-${index}`}
                    >
                        <BoxedLetter letter={letter} />
                    </GridItem>
                  );
                })}
            </Grid>
        </GridItem>
        <GridItem>
            <DeleteIcon visibility={visibility} onClick={() => { props.onRemoveWord(paddedWord) }}/>
        </GridItem>
    </Grid>
  );
}

function tileBackgroundColor(letter: string) {
  if (letter == " ") {
    return "gray.400";
  } else {
    return "green";
  }
}

function tileForegroundColor(letter: string) {
  if (letter == " ") {
    return "gray.400";
  } else {
    return "white";
  }
}

function BoxedLetter(props: {
  letter: string,
}) {
  // Use the letter "W" as a dummy invisible blank letter for spacing.
  return (
    <Text
      borderRadius="md"
      color={tileForegroundColor(props.letter)}
      fontSize="lg"
      fontWeight="bold"
      bg={tileBackgroundColor(props.letter)}>
        {props.letter == " " ? "W" : props.letter}
    </Text>
  );
}
