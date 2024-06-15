import React from "react";
import { Card } from "react-bootstrap";
import { Suite } from "../PokerCard";
import { IDraggedCard } from "../../Playground/Solitaire";
import ImageProvider from "../../assets/img/ImageProvider";

const Foundation: React.FC<{
  type: Suite;
  foundationStack: IDraggedCard[];
}> = ({ type, foundationStack }) => {
  return (
    <>
      {foundationStack.length > 0 ? (
        <Card>
          <ImageProvider
            rank={foundationStack[0]?.rank}
            suit={foundationStack[0]?.suit}
            isHidden={false}
          />
        </Card>
      ) : (
        <Card></Card>
      )}
    </>
  );
};

export default Foundation;
