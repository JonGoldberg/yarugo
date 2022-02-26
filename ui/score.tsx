import {Box, Text, Tooltip} from "@chakra-ui/react";

export default function ScoreDisplay(props: {
  score: number,
  wordList: string[],
}) {
  const scoreColor = getScoreColor(props.score);
  const scoreLabel =
    getScoreTooltip(props.wordList, props.score);
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
              color={scoreColor}
              padding={3}
            >
                {props.score}
            </Text>
        </Box>
    </Tooltip>
  );
}

function getScoreTooltip(
  wordList: string[],
  score: number,
) {
  if (wordList.length > 0) {
    return `Score ${score}: ${wordList.length} words used.`;
  } else {
    return "Create at least one word to start scoring points.";
  }
}

const SCORE_COLORS = [
  {threshold: 90, color: "green"},
  {threshold: 80, color: "orange"},
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
