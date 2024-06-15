import { Card } from "react-bootstrap";

import PokerCard from "../PokerCard";
import { ICardData, IDraggedCard } from "../../Playground/Solitaire";
import { Cards } from "../../assets/img/ImageProvider";

interface IYardStack {
  currCard: ICardData | null;
  prevCard: ICardData | null;
  onDragging: (cardDetails: IDraggedCard | null) => void;
}

const YardStack: React.FC<IYardStack> = ({
  currCard,
  prevCard,
  onDragging,
}) => {
  const yardStackStyle = {
    backgroundImage:
      prevCard !== null
        ? `url('/img/${Cards[prevCard?.suit][prevCard?.rank - 1]}.png')`
        : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const cardDraggable =
    currCard !== null ? (
      <PokerCard
        isHidden={false}
        rank={currCard.rank}
        suit={currCard.suit}
        onDragging={onDragging}
        id="Yard"
      />
    ) : (
      <Card></Card>
    );

  return (
    <>
      <Card style={yardStackStyle}>{cardDraggable}</Card>
    </>
  );
};

export default YardStack;
