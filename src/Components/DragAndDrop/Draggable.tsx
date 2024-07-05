import React, { useEffect, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { IDraggedCard } from "../../Playground/Solitaire";
import { Suite } from "../PokerCard";

export interface IDraggableProps {
  id: string;
  onDragging: (cardDetails: IDraggedCard | null) => void;
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  suit: Suite;
  child?: IDraggedCard[];
}

const Draggable: React.FC<React.PropsWithChildren<IDraggableProps>> = ({
  id,
  onDragging,
  rank,
  suit,
  child,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });
  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
    }),
    [transform]
  );

  useEffect(() => {
    if (isDragging) {
      if (child !== undefined) {
        onDragging({ rank: rank, suit: suit, id: id, child: child });
      } else {
        onDragging({ rank: rank, suit: suit, id: id });
      }
    } else onDragging(null);
  }, [isDragging]);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;
