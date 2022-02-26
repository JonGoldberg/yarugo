import {
  Button,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import {computeScoreFromWordList} from "../util/scoring";
import {getHistory} from "../store/store";

interface YesterdayProps {
  date: string;
  board: string;
  yarugos: string[];
}

export function Yesterday(props: YesterdayProps) {
  const letters = props.board.split("").sort().join("");
  const history = getHistory() || {};
  const yesterdayResults = history[props.date];
  const yesterdayResultDisplay =
    yesterdayResults
    ? <Text fontSize="2xl" textAlign="center">You got a <b>{computeScoreFromWordList(yesterdayResults)}</b>.</Text>
    : <Text fontSize="2xl">You missed yesterday. Yarugo every day!</Text>;

  return (
    <Popover>
        <PopoverTrigger>
            <Button>Yesterday</Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Yesterday's results</PopoverHeader>
            <PopoverBody>
                <Text fontSize="2xl">Board: </Text>
                <Text fontSize="2xl" fontWeight="bold">{letters}</Text>
                <br/>
                <Text fontSize="2xl">Yarugos: </Text>
                <Text fontSize="2xl" fontWeight="bold">{props.yarugos.join(", ")}</Text>
                <Divider />
                {yesterdayResultDisplay}
            </PopoverBody>
        </PopoverContent>
    </Popover>
  );
}
