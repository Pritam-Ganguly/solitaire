import { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";

import Draggable from "../DragAndDrop/Draggable";
import ImageProvider from "../../assets/img/ImageProvider";
import { IDraggedCard } from "../../Playground/Solitaire";

interface IGroup extends IDraggedCard {
  onDragging: (cardDetails: IDraggedCard | null) => void;
  styles: any;
}

const Group: React.FC<PropsWithChildren<IGroup>> = ({
  id,
  rank,
  suit,
  onDragging,
  styles,
  child,
  isDisabled,
  children,
}) => {
  return (
    <>
      {isDisabled ? (
        <>
          <Card style={styles}>
            <ImageProvider rank={rank} suit={suit} isHidden={true} />
          </Card>
          {children}
        </>
      ) : (
        <Draggable
          id={`${id}`}
          rank={rank}
          suit={suit}
          child={child}
          onDragging={onDragging}
        >
          <Card style={styles}>
            <ImageProvider rank={rank} suit={suit} isHidden={false} />
          </Card>
          {children}
        </Draggable>
      )}
    </>
  );
};

export default Group;
