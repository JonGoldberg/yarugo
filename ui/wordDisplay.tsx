import {Center, Text} from "@chakra-ui/react";

export default function WordDisplay(props: {
  word: string,
  highlight: boolean,
}) {
  const color = props.highlight ? "green" : "black";
  return (
    <Center>
        <Text fontSize="3xl" color={color} fontWeight="bold">{props.word || "-"}</Text>
    </Center>
  );
}
