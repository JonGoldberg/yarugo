import {Box, Text, Tooltip} from "@chakra-ui/react";

export default function Score(props: {
  isComplete: boolean,
  clickCounts: {[key: string]: number},
  totalWordsUsed: number,
}) {
  var duplicateLetterCount = 0;
  for (const count of Object.values(props.clickCounts)) {
    if (count > 1) {
      duplicateLetterCount = duplicateLetterCount + (count-1);
    }
  }
  const score = computeScore(props.totalWordsUsed, duplicateLetterCount);

  const gradeString = props.isComplete ? computeGradeString(score) : 'Inc';
  const scoreLabel =
    getScoreTooltip(props.isComplete, score, props.totalWordsUsed, duplicateLetterCount);
  return (
    <Box
      backgroundImage="url('/images/notebook.png')"
      backgroundRepeat="no-repeat"
    >
        <Tooltip label={scoreLabel} hasArrow={true}>
            <Text margin={2} fontSize="3xl" fontWeight="bold">{gradeString}</Text>
        </Tooltip>
    </Box>
  );
}

function computeScore(
  totalWordsUsed: number,
  duplicateLetterCount: number,
) {
  var score = 100;

  // Take off 10 points for every word past 1.
  if (totalWordsUsed > 1) {
    score = score - ((totalWordsUsed - 1) * 10);
  }

  // Take off 5 points for every extra use of a letter.
  score = score - (duplicateLetterCount * 5);
  return score;
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

function computeGradeString(score: number) {
  if (score == 100) {
    return 'A+';
  } else if (score < 60) {
    return 'F';
  } else {
    const gradeThresholds = {
      90: 'A',
      80: 'B',
      70: 'C',
      60: 'D',
    };
    const majorGrade = gradeThresholds[Math.floor(score/10) * 10];
    const minorGrade = (score % 10) < 3 ? '-' : (score % 10) > 6 ? '+' : '';
    return `${majorGrade}${minorGrade}`;
  }
}
