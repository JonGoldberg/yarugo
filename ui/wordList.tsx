import {Divider, Grid, GridItem, Text} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

export default function WordList(props: {
  words: string[],
  onRemoveWord: (word: string) => void,
}) {
  return (
    <Grid templateColumns="1fr">
        <GridItem w="100%">
            <Text fontSize="2xl" fontWeight="bold">Your words</Text>
            <Divider  />
        </GridItem>
        {props.words.map((word, index) => {
          return (
            <RemovableWord key={index} word={word} onDelete={props.onRemoveWord} />
          );
        })}
    </Grid>
  );
}

function RemovableWord(props: {
  word: string,
  onDelete: (word: string) => void,
}) {
  return (
    <Grid templateColumns="1fr 9fr">
        <GridItem>
            <DeleteIcon onClick={() => { props.onDelete(props.word) }}/>
        </GridItem>
        <GridItem>
            <Text fontSize="3xl">{props.word}</Text>
        </GridItem>
    </Grid>
  );
}
