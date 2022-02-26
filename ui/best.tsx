import {computeScoreFromWordList} from "../util/scoring";
import {Grid, GridItem, Image, Text} from "@chakra-ui/react";

export default function BestDisplay(props: {
  words: string[],
  onClick: () => void,
}) {
  if (props.words.length == 0) {
    return (
      <Text fontSize="2xl">Create a word to start scoring points.</Text>
    );
  }
  const score = computeScoreFromWordList(props.words);
  return (
    <Grid templateColumns="1fr 1fr 2fr" onClick={props.onClick}>
        <GridItem>
            <Image src="/images/todays-best.png" alt="Today's best" h="100%" />
        </GridItem>
        <GridItem>
            <Text textAlign="left" fontSize="3xl" fontWeight="bold">{score}</Text>
        </GridItem>
        <GridItem>
            <Text textAlign="left" fontSize="2xl">{props.words.join(", ")}</Text>
        </GridItem>
    </Grid>
  );
}
