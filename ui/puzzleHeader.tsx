import {
  Button,
  Grid,
  GridItem,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

export default function PuzzleHeader(props: {
  puzzleDate: string,
  yesterdaysBoard: string,
  yesterdaysYarugos: string[],
}) {
  const yesterdayLetters = props.yesterdaysBoard.split("").sort().join("");
  return (
    <Grid templateColumns="2fr 1fr 1fr 1fr" gap={1} margin={2}>
        <GridItem>
            <Text fontSize="2xl" fontWeight="bold" margin={2}>Yarugo</Text>
        </GridItem>
        <GridItem>
            <Popover>
                <PopoverTrigger>
                    <Button>Help</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>How to play Yarugo</PopoverHeader>
                    <PopoverBody>
                        <p>Create a three-, four-, five-, six- and nine-letter word.</p>
                        <br/>
                        <p>Score points by using each letter as few times as possible. Each letter tile shows you how many points you'll get the next time you use that letter.</p>
                        <br/>
                        <p>And every puzzle has at least one <em>yarugo</em> -- a nine letter word that covers the entire grid.</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </GridItem>
        <GridItem>
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
        </GridItem>
        <GridItem>
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
                            <Text fontSize="2xl" fontWeight="bold">{yesterdayLetters}</Text>
                        </p>
                        <p>
                            <Text fontSize="2xl">Yarugos: </Text>
                            <Text fontSize="2xl" fontWeight="bold">{props.yesterdaysYarugos.join(", ")}</Text>
                        </p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </GridItem>
        <GridItem colSpan={4}>
            <Text fontSize="md" fontWeight="bold" align="center">{props.puzzleDate}</Text>
        </GridItem>
    </Grid>
  );
}
