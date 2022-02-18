import {computeScoreFromWordList, computeGradeString} from "../util/scoring";
import {Grid, GridItem, Image, Text} from "@chakra-ui/react";

export default function BestDisplay(props: {
  words: string[],
}) {
  if (props.words.length == 0) {
    return (
      <Text fontSize="2xl">Use every letter at least once.</Text>
    );
  }
  const score = computeScoreFromWordList(props.words);
  const grade = computeGradeString(score);
  return (
    <Grid templateColumns="1fr 1fr 2fr">
        <GridItem>
            <Image src="/images/todays-best.png" alt="Today's best" h="100%" />
        </GridItem>
        <GridItem>
            <Text textAlign="left" fontSize="3xl" fontWeight="bold">{grade}</Text>
        </GridItem>
        <GridItem>
            <Text textAlign="left" fontSize="2xl">{props.words.join(", ")}</Text>
        </GridItem>
    </Grid>
  );
}
