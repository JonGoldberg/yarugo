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
import {DeleteIcon} from "@chakra-ui/icons";
import {computeClickCounts} from "../util/letters";
import {computeScoreFromWordList} from "../util/scoring";
import {EmailIcon} from "@chakra-ui/icons";
import {getEmoji} from "./letter";
import ScoreDisplay from "./score";

export default function SuccessModal(props: {
  puzzleDate: string,
  words: string[],
  isOpen: boolean,
  onClose: () => void,
}) {
  const score = computeScoreFromWordList(props.words);
  const improveYourScore = (score < 100) ? improveScoreHint() : null;
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
                    {improveYourScore}
                    <GridItem colSpan={2} padding={3}>
                        <Divider />
                    </GridItem>
                    <GridItem colSpan={2} textAlign="center">
                        <Button
                          colorScheme="green"
                          h="100%"
                          onClick={() => handleShareClick(props.puzzleDate, score, props.words) }
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

function emojiOrNone(emoji: string) {
  return emoji || getEmoji(0);
}

function handleShareClick(puzzleDate: string, score: number, words: string[]) {
  if (navigator.share) {
    const clickCounts: {[letter: string]: number} = computeClickCounts(words, '');
    const clickEmoji = Object.values(clickCounts).map(count => getEmoji(count));
    const emojiLines = [
      `${emojiOrNone(clickEmoji[0])}${emojiOrNone(clickEmoji[1])}${emojiOrNone(clickEmoji[2])}`,
      `${emojiOrNone(clickEmoji[3])}${emojiOrNone(clickEmoji[4])}${emojiOrNone(clickEmoji[5])}`,
      `${emojiOrNone(clickEmoji[6])}${emojiOrNone(clickEmoji[7])}${emojiOrNone(clickEmoji[8])}`,
    ];
    navigator.share({
      title: "Yarugo",
      text: `My Yarugo score on ${puzzleDate}: ${score}!\n${emojiLines.join("\n")}`,
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

function improveScoreHint() {
  return (
    <GridItem colSpan={2} padding={3}>
        <Text fontSize="xl">Hint: you might be able to improve your score by clicking the
        <DeleteIcon color="darkorange" margin={1} />
        and finding words that use some letters fewer times.</Text>
    </GridItem>
  );
}
