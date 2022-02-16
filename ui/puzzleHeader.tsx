import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function PuzzleHeader(props: {
  puzzleDate: string,
}) {
  return (
    <Flex flexDirection="row">
        <Box>
            <Text fontSize="3xl" fontWeight="bold" margin={4}>Yarugo {props.puzzleDate}</Text>
        </Box>
        <Spacer />
        <Box margin={3}>
            <Popover>
                <PopoverTrigger>
                    <Button>About</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>About Yarugo</PopoverHeader>
                    <PopoverBody>
                        <p>Yarugo = <b>Yark</b> + <b>Hugo</b></p>
                        <p><b>Yark</b> is a sawfish. <b>Hugo</b> is a plump shark. They both like puzzles.</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
        <Box margin={3}>
            <Popover>
                <PopoverTrigger>
                    <Button>Help</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>How to play Yarugo</PopoverHeader>
                    <PopoverBody>
                        <p>Use every letter in the grid by creating words.</p>
                        <br/>
                        <p>Get your grade up by using as few words as possible and by using each letter as few times as possible.</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    </Flex>
  );
}
