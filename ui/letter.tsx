import {Box, Flex, Spacer, Square, Text} from "@chakra-ui/react";
import {pointsLeftAfterUse} from "../util/scoring";
import React from "react";

interface LetterButtonProps {
  letter: string,
  useCount: number,
  onClick: (letter: string) => void,
  isGameComplete: boolean,
};

const USE_COLORS = {
  0: "green",
  1: "olive",
  2: "darkorange",
  3: "red",
};

export function getBackgroundColor(useCount: number) {
  return "gray.400"; // USE_COLORS[useCount] || "gray";
}

const USE_EMOJI = {
  0: String.fromCodePoint(0x1F7E5), // Red
  1: String.fromCodePoint(0x1F7E7), // Orange
  2: String.fromCodePoint(0x1F7E8), // Yellow
  3: String.fromCodePoint(0x1F7E9), // Green
};

export function getEmoji(useCount: number) {
  return USE_EMOJI[useCount] || USE_EMOJI[3];
}

export function getPointColor(useCount: number) {
  return USE_COLORS[useCount] || "red";
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
        background: "gray.600",
        color: "white",
      }}
      onClick={() => props.onClick(props.letter) }
    >
        <Spacer flex="1" />
        <Square flex="8">
            <Text fontSize="4xl" fontWeight="bold">{props.letter}</Text>
        </Square>
        <Box
          flex="1"
          bg={getPointColor(props.useCount)}
          borderRadius="sm"
          padding={1}
        >
            <Text fontSize="sm">{pointsLeftAfterUse(props.useCount)}</Text>
        </Box>
    </Flex>
  );
}
