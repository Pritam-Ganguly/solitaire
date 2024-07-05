import React, { useState, useMemo } from "react";
import { Card, Col } from "react-bootstrap";

import DeckStack from "./DeckStack";
import { ICardData, IDraggedCard } from "../../Playground/Solitaire";
import YardStack from "./YardStack";

interface ISmartDeckProps {
  onDrag: (cardDetails: IDraggedCard | null) => void;
  deckCardStack: ICardData[];
  yardCardStack: ICardData[];
  setDeckCardStack: React.Dispatch<React.SetStateAction<ICardData[]>>;
  setYardCardStack: React.Dispatch<React.SetStateAction<ICardData[]>>;
}

const SmartDeck: React.FC<ISmartDeckProps> = ({
  onDrag,
  deckCardStack,
  yardCardStack,
  setDeckCardStack,
  setYardCardStack,
}) => {
  const [animateStyle, setAnimateStyle] = useState<boolean>(false);
  const currCard = useMemo(() => yardCardStack[0] || null, [yardCardStack]);

  const prevCard = useMemo(
    () => (yardCardStack.length > 1 ? yardCardStack[1] : null),
    [yardCardStack]
  );

  const handleDeckClick = () => {
    setAnimateStyle((prev) => !prev);
    setYardCardStack((prevState) => [deckCardStack[0], ...prevState]);
    setDeckCardStack((prevData) => prevData.slice(1));
  };

  const handleReset = () => {
    setDeckCardStack(yardCardStack.reverse());
    setYardCardStack([]);
  };

  return (
    <>
      <Col>
        {deckCardStack.length === 0 ? (
          <Card onClick={handleReset}>...</Card>
        ) : (
          <DeckStack onClick={handleDeckClick} />
        )}
      </Col>
      <Col className={`yard ${animateStyle ? "soft" : "soft_alt"}`}>
        <YardStack
          currCard={currCard}
          prevCard={prevCard}
          onDragging={onDrag}
        />
      </Col>
    </>
  );
};

export default SmartDeck;
