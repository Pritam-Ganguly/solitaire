
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable: React.FC<React.PropsWithChildren<{id: string}>> = ({id, children}) => 
{
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    height: "125px",
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
  
export default Droppable;