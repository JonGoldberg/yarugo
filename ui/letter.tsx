import {Box, Flex, Spacer, Square, Text} from "@chakra-ui/react";
import {pointsLeftAfterUse} from "../util/scoring";
import React from "react";

interface LetterButtonProps {
  letter: string,
  useCount: number,
  onClick: (letter: string) => void,
  isGameComplete: boolean,
};

const BG_COLORS = {
  0: "green",
  1: "orange",
  2: "darkorange",
  3: "orangered",
};

function getBackgroundColor(useCount: number) {
  return BG_COLORS[useCount] || "red";
}

export default function LetterButton(props: LetterButtonProps) {
  return (
    <Flex
      width="100%"
      as="button"
      bg={getBackgroundColor(props.useCount)}
      color="white"
      borderRadius="md"
      disabled={props.isGameComplete}
      _hover={{
        background: "yellow",
        color: "teal.500",
      }}
      onClick={() => props.onClick(props.letter) }
    >
        <Spacer flex="1" />
        <Square flex="8">
            <Text fontSize="4xl" fontWeight="bold">{props.letter}</Text>
        </Square>
        <Box flex="1">
            <Text fontSize="sm">{pointsLeftAfterUse(props.useCount)}</Text>
        </Box>
    </Flex>
  );
}
