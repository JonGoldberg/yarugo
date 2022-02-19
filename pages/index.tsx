import {
  Alert,
  Center,
  Flex,
} from "@chakra-ui/react";

import LetterBoard from "../ui/letterBoard";
import PuzzleHeader from "../ui/puzzleHeader";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error(`Failed to get response: ${await res.text()}`);
  }
  return await res.json();
}

const Puzzle = () => {
  //const { data, error } = {data: null, error: Error("uh oh!")};
  //const { data, error } = {data: null, error: null};
  const { data: boardData, error: boardError } = useSWR(`/api/board`, fetcher);

  if (boardError) {
    return <Alert status="error">Failed to load board: {boardError.message}</Alert>;
  }

  if (!boardData) {
    return <Alert status="info">Loading board...</Alert>;
  }

  return (
    <Center>
        <Flex flexDirection="column">
            <PuzzleHeader
              puzzleDate={boardData.date}
              yesterdaysBoard={boardData.lastBoard.toUpperCase()}
              yesterdaysYarugos={boardData.lastYarugos}
            />
            <LetterBoard board={boardData.board.toUpperCase()} />
        </Flex>
    </Center>
  );
};

export default Puzzle;
