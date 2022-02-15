import LetterButton from "./letter";
import React from "react";
import {SimpleGrid} from "@chakra-ui/react";

export default function LetterGrid(props: {
  board: string,
  clickCounts: {[key: string]: number},
  isGameComplete: boolean,
  onLetterClick: (letter: string) => void,
}) {
  return (
    <SimpleGrid columns={3} spacing={3} margin={3}>

    {props.board.split('').map((ch, index) => {
      return (
        <LetterButton
          key={index}
          letter={ch}
          useCount={props.clickCounts[ch] || 0}
          isGameComplete={props.isGameComplete}
          onClick={props.onLetterClick}
        />
      );
    })}
      </SimpleGrid>
  );
}
