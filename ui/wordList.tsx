import {CloseButton, Divider, Flex, Spacer, Text} from "@chakra-ui/react";

export default function WordList(props: {
  words: string[],
  onRemoveWord: (word: string) => void,
}) {
  return (
    <Flex flexDirection="column">
        <Text fontSize="2xl" fontWeight="bold">Your words</Text>
        <Divider  />
        {props.words.map((word, index) => {
          return (
            <RemovableWord key={index} word={word} onDelete={props.onRemoveWord} />
          );
        })}
    </Flex>
  );
}

function RemovableWord(props: {
  word: string,
  onDelete: (word: string) => void,
}) {
  return (
    <Flex flexDirection="row">
        <Text fontSize="3xl">{props.word}</Text>
        <Spacer />
        <CloseButton onClick={() => { props.onDelete(props.word) }}/>
    </Flex>
  );
}
