import { Suite } from "../../Components/PokerCard";

const handleSpacialCard: (rank: number) => number | string = (rank: number) => {
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

const heartCards = new Array(13)
  .fill(0)
  .map((_, i) => `${handleSpacialCard(i + 1)}_of_hearts`);
const diamondCards = new Array(13)
  .fill(0)
  .map((_, i) => `${handleSpacialCard(i + 1)}_of_diamonds`);
const clubCards = new Array(13)
  .fill(0)
  .map((_, i) => `${handleSpacialCard(i + 1)}_of_clubs`);
const spadeCards = new Array(13)
  .fill(0)
  .map((_, i) => `${handleSpacialCard(i + 1)}_of_spades`);

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
    <>
      {isHidden ? (
        <img
          src={`/img/card_back_red.png`}
          alt="spade"
          style={{
            width: "100px",
            height: "145px",
          }}
          onContextMenu={preventContextMenu}
        />
      ) : (
        <img
          src={`/img/${Cards[suit][rank - 1]}.png`}
          alt={`rank = ${rank}, suit = ${suit}`}
          style={{
            width: "100px",
            height: "145px",
          }}
          onContextMenu={preventContextMenu}
        />
      )}
    </>
  );
};

export default ImageProvider;
