import {computeClickCounts} from "../util/letters";
import {
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import ScoreDisplay from "./score";

export default function SuccessModal(props: {
  words: string[],
  isOpen: boolean,
  onClose: () => void,
}) {
  const totalWordsUsed = props.words.length;
  const clickCounts = computeClickCounts(props.words, '');

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                <Text fontSize="3xl" textAlign="center">Score Details</Text>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Grid templateColumns="1fr 1fr">
                    <GridItem textAlign="center">
                        <Text fontSize="2xl">Your best so far:</Text>
                    </GridItem>
                    <GridItem w="100%" h="100%" textAlign="center">
                        <ScoreDisplay wordList={props.words} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text textAlign="left" fontSize="2xl">{props.words.join(", ")}</Text>
                    </GridItem>
                </Grid>
            </ModalBody>
        </ModalContent>
    </Modal>
  );
}
