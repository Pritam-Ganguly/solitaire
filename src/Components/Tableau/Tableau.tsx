import React, { useEffect } from "react";
import PokerCard from "../PokerCard";
import EmptyDeck from "../EmptyDeck";
import Group from "./Group";
import { IDraggedCard } from "../../Playground/Solitaire";

const Tableau: React.FC<{
  id: string;
  tableauStack: IDraggedCard[];
  setStack: React.Dispatch<React.SetStateAction<IDraggedCard[]>>;
  onDragging: (cardDetails: IDraggedCard | null) => void;
}> = ({ id, tableauStack, setStack, onDragging }) => {
  useEffect(() => {
    if (
      tableauStack.length > 0 &&
      tableauStack[tableauStack.length - 1].isDisabled === true
    ) {
      setStack((prev) => {
        prev[prev.length - 1].isDisabled = false;
        return prev;
      });
    }
  }, [tableauStack]);

  return (
    <section>
      {tableauStack.length === 0 ? (
        <EmptyDeck />
      ) : (
        tableauStack.reduceRight((acc, current, i, array) => {
          const overlapStyle = {
            position: "relative",
            top: `-${i * 105}px`,
          };

          if (acc === null) {
            return (
              <PokerCard
                id={`${id}Tab${0}`}
                rank={tableauStack[0].rank}
                suit={tableauStack[0].suit}
                isHidden={tableauStack[0].isDisabled === true}
                onDragging={onDragging}
              />
            );
          }
          return (
            <Group
              id={`${id}Tab${i}`}
              onDragging={onDragging}
              rank={current.rank}
              suit={current.suit}
              styles={overlapStyle}
              isDisabled={current.isDisabled === true}
              child={tableauStack.slice(i)}
            >
              {acc}
            </Group>
          );
        }, <></>)
      )}
    </section>
  );
};

export default Tableau;
