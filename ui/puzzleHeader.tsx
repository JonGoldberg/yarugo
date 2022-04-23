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
import {Yesterday} from "./yesterday";

export default function PuzzleHeader(props: {
  puzzleDate: string,
  yesterdaysDate: string,
  yesterdaysBoard: string,
  yesterdaysYarugos: string[],
}) {
  return (
    <Grid templateColumns="2fr 1fr 1fr 1fr" gap={1} margin={2}>
        <GridItem>
            <Text color="white" fontSize="2xl" fontWeight="bold" margin={2}>Yarugo</Text>
        </GridItem>
        <GridItem>
            <Popover>
                <PopoverTrigger>
                    <Button colorScheme="green">Help</Button>
                </PopoverTrigger>
                <PopoverContent bgColor="gray.600" color="white">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>How to play Yarugo</PopoverHeader>
                    <PopoverBody>
                        <p>Try to score 100 points by creating a three-, four-, five-, six- and nine-letter word.</p>
                        <br/>
                        <p>Use each letter as few times as possible &mdash; the letter tile shows you how many points you'll get the next time you use that letter.</p>
                        <br/>
                        <p>And every puzzle has at least one <em>yarugo</em> &mdash; a nine letter word that covers the entire grid.</p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </GridItem>
        <GridItem>
            <Popover>
                <PopoverTrigger>
                    <Button colorScheme="green">About</Button>
                </PopoverTrigger>
                <PopoverContent bgColor="gray.600" color="white">
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
            <Yesterday
              date={props.yesterdaysDate}
              board={props.yesterdaysBoard}
              yarugos={props.yesterdaysYarugos}
            />
        </GridItem>
        <GridItem colSpan={4}>
            <Text fontSize="md" fontWeight="bold" align="center">{props.puzzleDate}</Text>
        </GridItem>
    </Grid>
  );
}
