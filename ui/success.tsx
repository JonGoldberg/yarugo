import {computeScoreFromWordList} from "../util/scoring";
import {EmailIcon} from "@chakra-ui/icons";
import {
  Button,
  createStandaloneToast,
  Divider,
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
  puzzleDate: string,
  words: string[],
  isOpen: boolean,
  onClose: () => void,
}) {
  const score = computeScoreFromWordList(props.words);
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="gray.600" color="white">
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
                        <ScoreDisplay wordList={props.words} score={score} />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text textAlign="left" fontSize="2xl">{props.words.join(", ")}</Text>
                    </GridItem>
                    <GridItem colSpan={2} padding={3}>
                        <Divider />
                    </GridItem>
                    <GridItem colSpan={2} textAlign="center">
                        <Button
                          colorScheme="green"
                          h="100%"
                          onClick={() => handleShareClick(props.puzzleDate, score) }
                        >
                            <Grid templateColumns="2fr 1fr">
                                <GridItem>
                                    <Text fontSize="2xl">Share</Text>
                                </GridItem>
                                <GridItem>
                                    <EmailIcon h="100%" />
                                </GridItem>
                            </Grid>
                        </Button>
                    </GridItem>
                </Grid>
            </ModalBody>
        </ModalContent>
    </Modal>
  );
}

function handleShareClick(puzzleDate: string, score: number) {
  if (navigator.share) {
    navigator.share({
      title: "Yarugo",
      text: `My Yarugo score on ${puzzleDate}: ${score}!`,
      url: "https://yarugo.com",
    }).then(() => {
      console.log('Share success');
    })
    .catch(console.error);
  } else {
      const toastId = 'unsupported-share';
      const toast = createStandaloneToast();
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: "Oops",
          description: "I'm sorry. It looks like sharing isn't supported on this browser.",
          status: "warning",
          duration: 3000,
          position: "top",
        });
      }
  }
}
