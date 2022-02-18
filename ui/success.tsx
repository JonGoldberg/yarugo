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
  totalWordsUsed: number,
  clickCounts: {[key: string]: number},
  words: string[],
  isOpen: boolean,
  onClose: () => void,
}) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                <Text fontSize="3xl" textAlign="center">You did it!</Text>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Grid templateColumns="1fr 1fr">
                    <GridItem textAlign="center">
                        <Text fontSize="2xl">Your score:</Text>
                    </GridItem>
                    <GridItem w="100%" h="100%" textAlign="center">
                        <ScoreDisplay
                          isComplete={true}
                          totalWordsUsed={props.totalWordsUsed}
                          clickCounts={props.clickCounts}
                        />
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
