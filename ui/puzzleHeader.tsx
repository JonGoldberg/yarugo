import {
  Box,
  Button,
  Flex,
  Link,
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
  yesterdaysBoard: string,
  yesterdaysYarugos: string[],
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
                        <br/>
                        <p><b>Yark</b> is a sawfish. <b>Hugo</b> is a plump shark. They both like puzzles.</p>
                        <br/>
                        <p>Thanks to <Link href="http://wordlist.sourceforge.net" isExternal>SCOWL and Friends</Link> for the premade free use dictionary.</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
        <Box margin={3}>
            <Popover>
                <PopoverTrigger>
                    <Button>Yesterday</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Yesterday's results</PopoverHeader>
                    <PopoverBody>
                        <p>
                            <Text fontSize="2xl">Board: </Text>
                            <Text fontSize="2xl" fontWeight="bold">{props.yesterdaysBoard}</Text>
                        </p>
                        <p>
                            <Text fontSize="2xl">Yarugos: </Text>
                            <Text fontSize="2xl" fontWeight="bold">{props.yesterdaysYarugos.join(", ")}</Text>
                        </p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    </Flex>
  );
}
