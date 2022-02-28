import {Center, Text} from "@chakra-ui/react";

export default function WordDisplay(props: {
  word: string,
  highlight: boolean,
}) {
  const color = props.highlight ? "green.500" : "gray.200";
  return (
    <Center>
        <Text fontSize="2xl" color={color} fontWeight="bold">{props.word || "-"}</Text>
    </Center>
  );
}
