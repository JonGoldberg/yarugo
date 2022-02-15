import {Box, Button, Flex} from "@chakra-ui/react";
import React from "react";
import ScoreDisplay from "./score";

type ControlBoardProps = {
  clickCounts: {[key: string]: number},
  totalWordsUsed: number,
  isComplete: boolean,
  onEnterClick: () => void,
  onDeleteClick: () => void,
};

class ControlBoard extends React.Component<ControlBoardProps> {
  render() {
    return (
      <Flex>
          <ScoreDisplay
            isComplete={this.props.isComplete}
            totalWordsUsed={this.props.totalWordsUsed}
            clickCounts={this.props.clickCounts}
          />
          <Button margin={3} fontSize="4xl" fontWeight="bold"
                  onClick={this.props.onEnterClick}>Enter
          </Button>
          <Button margin={3} fontSize="4xl" fontWeight="bold"
                  onClick={this.props.onDeleteClick}>&lt;&lt;
          </Button>
      </Flex>
    );
  }
};

export default ControlBoard;
