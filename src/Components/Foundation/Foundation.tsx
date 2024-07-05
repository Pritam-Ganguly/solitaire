import React from "react";
import { Card } from "react-bootstrap";
import { Suite } from "../PokerCard";
import { IDraggedCard } from "../../Playground/Solitaire";
import ImageProvider from "../../assets/img/ImageProvider";

const Foundation: React.FC<{
  type: Suite;
  foundationStack: IDraggedCard[];
}> = ({ foundationStack }) => {
  const hasCards = foundationStack.length > 0;
  const topCard = foundationStack[0];

  return (
    <Card>
      {hasCards && topCard ? (
        <ImageProvider
          rank={topCard.rank}
          suit={topCard.suit}
          isHidden={false}
        />
      ) : null}
    </Card>
  );
};

export default Foundation;
