import React from "react";
import { Suite } from "../PokerCard";
import { Card } from "react-bootstrap";
import ImageProvider from "../../assets/img/ImageProvider";

const DeckStack: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <div
      onClick={() => onClick()}
    >
      <Card className="deckStack">
        <ImageProvider rank={1} suit={Suite.clubs} isHidden={true} />
      </Card>
    </div>
  );
};

export default DeckStack;
