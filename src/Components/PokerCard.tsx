import { Card } from "react-bootstrap";

import ImageProvider from "../assets/img/ImageProvider";
import Draggable from "./DragAndDrop/Draggable";
import { IDraggedCard } from "../Playground/Solitaire";

export enum Suite {
  hearts = 0,
  diamonds = 1,
  clubs = 2,
  spades = 3,
}
export interface IPokerCardProps extends IDraggedCard{
  isHidden: boolean;
  onDragging: (cardDetails: IDraggedCard | null) => void,
  id: string,
  style?: any
}

const PokerCard: React.FC<IPokerCardProps> = ({ rank, suit, isHidden, onDragging, id, style }) => {
  return (
    <>
      {isHidden ? (
          <Card style={style} id={id}>
            <ImageProvider rank={rank} suit={suit} isHidden={isHidden} />
          </Card>
      ) : (
        <Draggable id={id} rank={rank} suit={suit} onDragging={onDragging}>
          <Card style={style}>
            <ImageProvider rank={rank} suit={suit} isHidden={isHidden} />
          </Card>
        </Draggable>
      )}
    </>
  );
};

export default PokerCard;
