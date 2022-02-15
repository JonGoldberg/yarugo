import {Box, Flex, Spacer, Square, Text, useToast} from "@chakra-ui/react";
import React from "react";

// No letter can be used more than three times.
const USE_LIMIT = 3;

interface LetterButtonProps {
  letter: string,
  useCount: number,
  onClick: (letter: string) => void,
  isGameComplete: boolean,
};

const BG_COLORS = {
  0: "gray",
  1: "green",
  2: "orange",
  3: "red",
};

export default function LetterButton(props: LetterButtonProps) {
  const toast = useToast();
  return (
    <Flex
      as="button"
      bg={BG_COLORS[props.useCount]}
      color="white"
      borderRadius="md"
      disabled={props.isGameComplete}
      _hover={{
        background: "yellow",
        color: "teal.500",
      }}
      onClick={() => {handleLetterClick(props, toast)}}
    >
        <Spacer flex="1" />
        <Square flex="8">
            <Text fontSize="4xl" fontWeight="bold">{props.letter}</Text>
        </Square>
        <Box flex="1">
            <Text fontSize="sm">{props.useCount}</Text>
        </Box>
    </Flex>
  );
}

function handleLetterClick(props: LetterButtonProps, toast) {
  if (props.useCount >= USE_LIMIT) {
    const toastId = 'letter-count-exceeded';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: `You've used ${props.letter} too many times!`,
        status: "warning",
        duration: 3000,
        position: "top",
      });
    }
  } else {
    props.onClick(props.letter);
  }
}
