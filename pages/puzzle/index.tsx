import { GetStaticProps, NextPage } from "next";
import { Link, Flex, Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

const PuzzleIndexPage: NextPage<{puzzles: Puzzle[]}> = (props) => {
  return (
    <Box>
        <Flex
          flexDirection="column"
          alignItems="center">
            <Heading marginY="2rem">List of Puzzles</Heading>
            {props.puzzles.map(puzzle => {
              return (
                <NextLink
                  href={`/puzzle/${puzzle.id}`}
                  passHref
                  key={`/puzzle/${puzzle.id}`}
                >
                    <Link>
                        <Heading as="h3">
                            {puzzle.dateString}
                        </Heading>
                    </Link>
                </NextLink>
              );
            })}
        </Flex>
    </Box>
  );
};

export const getStaticProps: GetStaticProps =
  async() => {
    const puzzles = await import("../../lib/data/puzzles.json");
    return {
      props: {puzzles: puzzles.default}
    };
};
export default PuzzleIndexPage;

