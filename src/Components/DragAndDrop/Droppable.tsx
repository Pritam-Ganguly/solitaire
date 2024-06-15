
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

const Droppable: React.FC<React.PropsWithChildren<{id: string}>> = ({id, children}) => 
{
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    height: "200px",
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
  
export default Droppable;