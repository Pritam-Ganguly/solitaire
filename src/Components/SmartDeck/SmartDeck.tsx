import { Card, Col } from "react-bootstrap";

import DeckStack from "./DeckStack";
import { ICardData, IDraggedCard } from "../../Playground/Solitaire";
import YardStack from "./YardStack";
import { useState } from "react";

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
  const currCard = yardCardStack.length === 0 ? null : yardCardStack[0];
  const prevCard = yardCardStack.length <= 1 ? null : yardCardStack[1];

  const handleDeckClick = () => {
    setAnimateStyle(prev => !prev)
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
      <Col className={`yard ${animateStyle ? "soft": "soft_alt"}`}>
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
