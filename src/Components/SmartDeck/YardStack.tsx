import { Card } from "react-bootstrap";

import PokerCard from "../PokerCard";
import { ICardData, IDraggedCard } from "../../Playground/Solitaire";
import { Cards } from "../../assets/img/ImageProvider";
import { animated, useSpringRef, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";

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
  const [statusCard, setStatusCard] = useState<ICardData | null>(null);
  const [rerender, setRerender] = useState<number>(0);

  const transRef = useSpringRef();
  const transitions = useTransition(rerender, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
  });

  useEffect(() => {
    if (currCard !== statusCard) {
      setRerender((prev) => prev + 1);
    }
    setStatusCard(prevCard);
  }, [currCard]);

  useEffect(() => {
    transRef.start();
  }, [rerender]);

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
      <>
        {transitions((style, _) => {
          return (
            <animated.div style={{ ...style }}>
              <PokerCard
                isHidden={false}
                rank={currCard.rank}
                suit={currCard.suit}
                onDragging={onDragging}
                id="Yard"
              />
            </animated.div>
          );
        })}
      </>
    ) : (
      <>
        <Card></Card>
      </>
    );

  return (
    <>
      <Card style={yardStackStyle}>{cardDraggable}</Card>
    </>
  );
};

export default YardStack;
