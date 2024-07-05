import { Suite } from "../../Components/PokerCard";

const handleSpecialCard: (rank: number) => number | string = (rank: number) => {
  switch (rank) {
    case 1:
      return "ace";
    case 11:
      return "jack";
    case 12:
      return "queen";
    case 13:
      return "king";
  }
  return rank;
};

const generateCards = (suit: string) =>
  new Array(13).fill(0).map((_, i) => `${handleSpecialCard(i + 1)}_of_${suit}`);

const heartCards = generateCards("hearts");
const diamondCards = generateCards("diamonds");
const clubCards = generateCards("clubs");
const spadeCards = generateCards("spades");

export const Cards = [heartCards, diamondCards, clubCards, spadeCards];

const ImageProvider: React.FC<{
  rank: number;
  suit: Suite;
  isHidden: boolean;
}> = ({ rank, suit, isHidden }) => {
  const preventContextMenu = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <img
      src={
        isHidden
          ? `/img/card_back_red.png`
          : `/img/${Cards[suit][rank - 1]}.png`
      }
      alt={isHidden ? "card back" : `rank = ${rank}, suit = ${Suite[suit]}`}
      style={{ width: "90px", height: "125px" }}
      onContextMenu={preventContextMenu}
    />
  );
};

export default ImageProvider;
