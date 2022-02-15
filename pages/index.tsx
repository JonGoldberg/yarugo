import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";


const IndexPage = () => {
  return (
    <>
        <Heading as="h1">Yarugo!</Heading>
        <NextLink href="/puzzle" passHref>
            <Link>Play yarugo</Link>
        </NextLink>
    </>
  );
};

export default IndexPage;

