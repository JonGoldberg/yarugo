import {Box, Text, Tooltip} from "@chakra-ui/react";
import {computeGradeString, computeScore} from "../util/scoring";
import {countDuplicateLetters} from "../util/letters";

export default function ScoreDisplay(props: {
  isComplete: boolean,
  clickCounts: {[key: string]: number},
  totalWordsUsed: number,
}) {
  const duplicateLetterCount = countDuplicateLetters(props.clickCounts);
  const score = computeScore(props.totalWordsUsed, duplicateLetterCount);

  const gradeString = props.isComplete ? computeGradeString(score) : 'N/A';
  const gradeColor = props.isComplete ? getScoreColor(score) : "gray";
  const scoreLabel =
    getScoreTooltip(props.isComplete, score, props.totalWordsUsed, duplicateLetterCount);
  return (
    <Tooltip
      label={scoreLabel}
      hasArrow={true}
    >
        <Box
          backgroundImage="url('/images/notebook.png')"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="auto 100%"
        >
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={gradeColor}
              padding={3}
            >
                {gradeString}
            </Text>
        </Box>
    </Tooltip>
  );
}

function getScoreTooltip(
  isComplete: boolean,
  score: number,
  totalWordsUsed: number,
  duplicateLetterCount: number,
) {
  if (isComplete) {
    return `Score ${score}: ${totalWordsUsed} words, ${duplicateLetterCount} repeat letters`;
  } else {
    return "Use every letter at least once to get your score.";
  }
}

const SCORE_COLORS = [
  {threshold: 90, color: "green"},
  {threshold: 80, color: "khaki"},
  {threshold: 70, color: "salmon"},
  {threshold: 60, color: "red"},
];

function getScoreColor(score: number) {
  for (const {threshold, color} of SCORE_COLORS) {
    if (score >= threshold) {
      return color;
    }
  }
  return "red";
}
