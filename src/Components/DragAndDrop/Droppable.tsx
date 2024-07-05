import React, { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable: React.FC<React.PropsWithChildren<{ id: string }>> = ({
  id,
  children,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = useMemo(
    () => ({
      height: "125px",
      opacity: isOver ? 0.5 : 1,
    }),
    [isOver]
  );

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
