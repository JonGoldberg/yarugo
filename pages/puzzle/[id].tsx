import {
  Alert,
  Flex,
} from "@chakra-ui/react";
//@@@Figure out how to reference absolute from root instead of relative.
import LetterBoard from "../../ui/letterBoard";
import PuzzleHeader from "../../ui/puzzleHeader";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error(`Failed to get response: ${await res.text()}`);
  }
  return await res.json();
}

const Puzzle = () => {
  const router = useRouter();
  const { id } = router.query;

  //const { data, error } = {data: null, error: Error("uh oh!")};
  //const { data, error } = {data: null, error: null};
  const { data: boardData, error: boardError } = useSWR(`/api/board/${id}`, fetcher);

  if (boardError) {
    return <Alert status="error">Failed to load board: {boardError.message}</Alert>;
  }

  if (!boardData) {
    return <Alert status="info">Loading board...</Alert>;
  }

  return (
    <Flex flexDirection="column">
      <PuzzleHeader puzzleDate={boardData.dateString} />
      <LetterBoard board={boardData.board} />
    </Flex>
  );
};

export default Puzzle;

