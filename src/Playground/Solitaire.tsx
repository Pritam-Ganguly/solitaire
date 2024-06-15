import { Card, Col, Container, Row } from "react-bootstrap";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useEffect, useState } from "react";

import SmartDeck from "../Components/SmartDeck/SmartDeck";
import { Suite } from "../Components/PokerCard";
import Droppable from "../Components/DragAndDrop/Droppable";
import Tableau from "../Components/Tableau/Tableau";
import Foundation from "../Components/Foundation/Foundation";

export interface IDraggedCard {
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  suit: Suite;
  id?: string;
  child?: IDraggedCard[];
  isDisabled?: boolean;
}

export interface ICardData {
  suit: Suite;
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
}

const cardData: ICardData[] = [
  { suit: Suite.clubs, rank: 1 },
  { suit: Suite.clubs, rank: 4 },
  { suit: Suite.clubs, rank: 9 },
  { suit: Suite.clubs, rank: 11 },
  { suit: Suite.diamonds, rank: 3 },
  { suit: Suite.spades, rank: 1 },
  { suit: Suite.spades, rank: 2 },
  { suit: Suite.spades, rank: 5 },
  { suit: Suite.spades, rank: 6 },
  { suit: Suite.spades, rank: 7 },
  { suit: Suite.spades, rank: 8 },
  { suit: Suite.spades, rank: 10 },
  { suit: Suite.spades, rank: 13 },
  { suit: Suite.hearts, rank: 2 },
  { suit: Suite.hearts, rank: 3 },
  { suit: Suite.hearts, rank: 4 },
  { suit: Suite.hearts, rank: 5 },
  { suit: Suite.hearts, rank: 6 },
  { suit: Suite.hearts, rank: 7 },
  { suit: Suite.hearts, rank: 8 },
  { suit: Suite.hearts, rank: 9 },
  { suit: Suite.hearts, rank: 10 },
  { suit: Suite.hearts, rank: 11 },
  { suit: Suite.hearts, rank: 12 },
];

const Solitaire: React.FC = () => {
  const [draggedCard, setDraggedCardDetails] = useState<IDraggedCard | null>(
    null
  );

  const [draggedStack, setDraggedStack] = useState<IDraggedCard[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [deckCardStack, setDeckCardStack] = useState<ICardData[]>(cardData);
  const [yardCardStack, setYardCardStack] = useState<ICardData[]>([]);

  const [foundationHearts, setFoundationHearts] = useState<IDraggedCard[]>([]);
  const [foundationDiamonds, setFoundationDiamonds] = useState<IDraggedCard[]>(
    []
  );
  const [foundationClubs, setFoundationClubs] = useState<IDraggedCard[]>([]);
  const [foundationSpades, setFoundationSpades] = useState<IDraggedCard[]>([]);

  const [tableauCardStack1, setTableauCardStack1] = useState<IDraggedCard[]>([
    { rank: 13, suit: Suite.clubs, id: "Yard" },
  ]);
  const [tableauCardStack2, setTableauCardStack2] = useState<IDraggedCard[]>([
    { rank: 12, suit: Suite.spades, id: "Yard", isDisabled: true },
    { rank: 11, suit: Suite.diamonds, id: "Yard" },
  ]);
  const [tableauCardStack3, setTableauCardStack3] = useState<IDraggedCard[]>([
    { rank: 10, suit: Suite.clubs, id: "Yard", isDisabled: true },
    { rank: 9, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 8, suit: Suite.diamonds, id: "Yard" },
  ]);
  const [tableauCardStack4, setTableauCardStack4] = useState<IDraggedCard[]>([
    { rank: 7, suit: Suite.clubs, id: "Yard", isDisabled: true },
    { rank: 5, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 4, suit: Suite.spades, id: "Yard", isDisabled: true },
    { rank: 3, suit: Suite.clubs, id: "Yard" },
  ]);
  const [tableauCardStack5, setTableauCardStack5] = useState<IDraggedCard[]>([
    { rank: 2, suit: Suite.clubs, id: "Yard", isDisabled: true },
    { rank: 1, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 13, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 12, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 11, suit: Suite.spades, id: "Yard" },
  ]);
  const [tableauCardStack6, setTableauCardStack6] = useState<IDraggedCard[]>([
    { rank: 10, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 9, suit: Suite.spades, id: "Yard", isDisabled: true },
    { rank: 8, suit: Suite.clubs, id: "Yard", isDisabled: true },
    { rank: 7, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 6, suit: Suite.clubs, id: "Yard", isDisabled: true },
    { rank: 6, suit: Suite.diamonds, id: "Yard" },
  ]);
  const [tableauCardStack7, setTableauCardStack7] = useState<IDraggedCard[]>([
    { rank: 5, suit: Suite.clubs, id: "Yard", isDisabled: true },
    { rank: 4, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 3, suit: Suite.spades, id: "Yard", isDisabled: true },
    { rank: 2, suit: Suite.diamonds, id: "Yard", isDisabled: true },
    { rank: 1, suit: Suite.hearts, id: "Yard", isDisabled: true },
    { rank: 13, suit: Suite.hearts, id: "Yard", isDisabled: true },
    { rank: 12, suit: Suite.clubs, id: "Yard" },
  ]);

  const tableauCardCheck = (
    stack: IDraggedCard[],
    setStack: React.Dispatch<React.SetStateAction<IDraggedCard[]>>
  ) => {
    if (stack.length > 0) {
      if (
        stack[stack.length - 1].rank ===
          (foundationClubs.length > 0 && foundationClubs.length < 13
            ? foundationClubs[0].rank + 1
            : 1) &&
        stack[stack.length - 1].suit === Suite.clubs
      ) {
        setFoundationClubs((prev) => [stack[stack.length - 1], ...prev]);
        console.log(foundationClubs, stack);
        setStack((prev) => prev.slice(0, -1));
      } else if (
        stack[stack.length - 1].rank ===
          (foundationDiamonds.length !== 0 && foundationDiamonds.length
            ? foundationDiamonds[0].rank + 1
            : 1) &&
        stack[stack.length - 1].suit === Suite.diamonds
      ) {
        setFoundationDiamonds((prev) => [stack[stack.length - 1], ...prev]);
        setStack((prev) => prev.slice(0, -1));
      } else if (
        stack[stack.length - 1].rank ===
          (foundationHearts.length !== 0 && foundationHearts.length
            ? foundationHearts[0].rank + 1
            : 1) &&
        stack[stack.length - 1].suit === Suite.hearts
      ) {
        setFoundationHearts((prev) => [stack[stack.length - 1], ...prev]);
        setStack((prev) => prev.slice(0, -1));
      } else if (
        stack[stack.length - 1].rank ===
          (foundationSpades.length !== 0 && foundationSpades.length
            ? foundationSpades[0].rank + 1
            : 1) &&
        stack[stack.length - 1].suit === Suite.spades
      ) {
        setFoundationSpades((prev) => [stack[stack.length - 1], ...prev]);
        setStack((prev) => prev.slice(0, -1));
      }
      // if (
      //   stack[stack.length - 1].rank ===
      //     (foundationClubs.length !== 0 ? foundationClubs[0].rank + 1 : 1) ||
      //   stack[stack.length - 1].rank ===
      //     (foundationDiamonds.length !== 0
      //       ? foundationDiamonds[0].rank + 1
      //       : 1) ||
      //   stack[stack.length - 1].rank ===
      //     (foundationHearts.length !== 0 ? foundationHearts[0].rank + 1 : 1) ||
      //   stack[stack.length - 1].rank ===
      //     (foundationSpades.length !== 0 ? foundationSpades[0].rank + 1 : 1)
      // ) {
      //   if (stack[stack.length - 1].suit === Suite.hearts) {
      //     setFoundationHearts((prev) => [stack[stack.length - 1], ...prev]);
      //     setStack((prev) => prev.slice(0, -2 ));
      //   }
      //   if (stack[stack.length - 1].suit === Suite.diamonds) {
      //     setFoundationDiamonds((prev) => [stack[stack.length - 1], ...prev]);
      //     setStack((prev) => prev.slice(0, -2 ));
      //   }
      //   if (stack[stack.length - 1].suit === Suite.clubs) {
      //     setFoundationClubs((prev) => [stack[stack.length - 1], ...prev]);
      //     setStack((prev) => prev.slice(0, -2 ));
      //   }
      //   if (stack[stack.length - 1].suit === Suite.spades) {
      //     setFoundationSpades((prev) => [stack[stack.length - 1], ...prev]);
      //     setStack((prev) => prev.slice(0, -2 ));
      //   }
      // }
    }
  };

  useEffect(() => {
    checkForFoundation();
  }, [
    foundationClubs,
    foundationDiamonds,
    foundationHearts,
    foundationSpades
  ]);

  const checkForFoundation = () => {
    if (yardCardStack.length > 0) {
      if (
        yardCardStack[0].rank ===
          (foundationClubs.length !== 0 && foundationClubs.length < 13
            ? foundationClubs[0].rank + 1
            : 1) &&
        yardCardStack[0].suit === Suite.clubs
      ) {
        setFoundationClubs((prev) => [yardCardStack[0], ...prev]);
        setYardCardStack((prev) => prev.slice(1));
      } else if (
        yardCardStack[0].rank ===
          (foundationDiamonds.length !== 0 && foundationDiamonds.length < 13
            ? foundationDiamonds[0].rank + 1
            : 1) &&
        yardCardStack[0].suit === Suite.diamonds
      ) {
        setFoundationDiamonds((prev) => [yardCardStack[0], ...prev]);
        setYardCardStack((prev) => prev.slice(1));
      } else if (
        yardCardStack[0].rank ===
          (foundationHearts.length !== 0 && foundationHearts.length < 13
            ? foundationHearts[0].rank + 1
            : 1) &&
        yardCardStack[0].suit === Suite.hearts
      ) {
        setFoundationHearts((prev) => [yardCardStack[0], ...prev]);
        setYardCardStack((prev) => prev.slice(1));
      } else if (
        yardCardStack[0].rank ===
          (foundationSpades.length > 0 && foundationSpades.length < 13
            ? foundationSpades[0].rank + 1
            : 1) &&
        yardCardStack[0].suit === Suite.spades
      ) {
        setFoundationSpades((prev) => [yardCardStack[0], ...prev]);
        setYardCardStack((prev) => prev.slice(1));
      }
    }
    tableauCardCheck(tableauCardStack1, setTableauCardStack1);
    tableauCardCheck(tableauCardStack2, setTableauCardStack2);
    tableauCardCheck(tableauCardStack3, setTableauCardStack3);
    tableauCardCheck(tableauCardStack4, setTableauCardStack4);
    tableauCardCheck(tableauCardStack5, setTableauCardStack5);
    tableauCardCheck(tableauCardStack6, setTableauCardStack6);
    tableauCardCheck(tableauCardStack7, setTableauCardStack7);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleRemoveYardCard = () => {
    setYardCardStack((prevStack) => prevStack.slice(1));
  };

  const handleDraggedCardAfterDragDone = (
    stack: IDraggedCard[],
    id: string | undefined
  ) => {
    switch (id?.slice(0, 4)) {
      case "Yard":
        handleRemoveYardCard();
        break;
      case "Tab1":
        setTableauCardStack1((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      case "Tab2":
        setTableauCardStack2((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      case "Tab3":
        setTableauCardStack3((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      case "Tab4":
        setTableauCardStack4((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      case "Tab5":
        setTableauCardStack5((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      case "Tab6":
        setTableauCardStack6((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      case "Tab7":
        setTableauCardStack7((prevState) =>
          prevState.filter((pv) => !stack.includes(pv))
        );
        break;
      default:
        console.log("unknown card");
        break;
    }
    setDraggedStack([]);
  };

  const isSameSuiteColor: (
    suit1: Suite,
    suit2: Suite | undefined
  ) => boolean = (suit1: Suite, suit2: Suite | undefined) => {
    switch (suit1) {
      case Suite.clubs:
        if (suit2 === Suite.clubs || suit2 === Suite.spades) return true;
        break;
      case Suite.diamonds:
        if (suit2 === Suite.diamonds || suit2 === Suite.hearts) return true;
        break;
      case Suite.hearts:
        if (suit2 === Suite.hearts || suit2 === Suite.diamonds) return true;
        break;
      case Suite.spades:
        if (suit2 === Suite.spades || suit2 === Suite.clubs) return true;
        break;
      default:
        console.log("error");
    }
    return false;
  };

  const isNextCard = (
    rankPrev: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13,
    rankNext: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | undefined
  ) => {
    if (rankPrev === 1) return false;
    if (rankPrev - 1 === rankNext) {
      return true;
    }
    return false;
  };

  const isValidDrag: (
    tabCard: IDraggedCard,
    draggedCard: IDraggedCard | null
  ) => boolean = (tabCard, draggedCard) => {
    if (tabCard !== undefined) {
      if (
        isSameSuiteColor(tabCard.suit, draggedCard?.suit) ||
        !isNextCard(tabCard.rank, draggedCard?.rank)
      ) {
        return false;
      }
    }
    return true;
  };

  const handleDragEnd = (event: any) => {
    if (event.over) {
      switch (event.over.id) {
        case "Tab1":
          if (
            !isValidDrag(
              tableauCardStack1[tableauCardStack1.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack1((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack1((prevState) => [...prevState, draggedCard]);
          }
          break;
        case "Tab2":
          if (
            !isValidDrag(
              tableauCardStack2[tableauCardStack2.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack2((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack2((prevState) => [...prevState, draggedCard]);
          }
          break;
        case "Tab3":
          if (
            !isValidDrag(
              tableauCardStack3[tableauCardStack3.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack3((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack3((prevState) => [...prevState, draggedCard]);
          }
          break;
        case "Tab4":
          if (
            !isValidDrag(
              tableauCardStack4[tableauCardStack4.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack4((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack4((prevState) => [...prevState, draggedCard]);
          }
          break;
        case "Tab5":
          if (
            !isValidDrag(
              tableauCardStack5[tableauCardStack5.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack5((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack5((prevState) => [...prevState, draggedCard]);
          }
          break;
        case "Tab6":
          if (
            !isValidDrag(
              tableauCardStack6[tableauCardStack6.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack6((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack6((prevState) => [...prevState, draggedCard]);
          }
          break;
        case "Tab7":
          if (
            !isValidDrag(
              tableauCardStack7[tableauCardStack7.length - 1],
              draggedCard
            )
          ) {
            break;
          }
          if (draggedStack.length > 0) {
            handleDraggedCardAfterDragDone(draggedStack, draggedCard?.id);
            setTableauCardStack7((prevState) => [
              ...prevState,
              ...draggedStack,
            ]);
          } else if (draggedCard && draggedCard !== null) {
            handleDraggedCardAfterDragDone([draggedCard], draggedCard?.id);
            setTableauCardStack7((prevState) => [...prevState, draggedCard]);
          }
          break;
        default:
          console.log("Invalid operation");
      }
    }
    setIsDragging(false);
    checkForFoundation();
  };

  const handleDragging = (cardDetails: IDraggedCard | null) => {
    if (cardDetails !== null) {
      if (cardDetails.child !== undefined) {
        handleStackDragging(cardDetails.child);
      }
      setDraggedCardDetails({
        rank: cardDetails.rank,
        suit: cardDetails.suit,
        id: cardDetails.id,
      });
    } else {
      setDraggedCardDetails(null);
    }
  };

  const handleStackDragging = (cardStackDetails: IDraggedCard[]) => {
    setDraggedStack(cardStackDetails);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <Container className="playground">
        <Row className="px-5">
          <SmartDeck
            onDrag={handleDragging}
            deckCardStack={deckCardStack}
            yardCardStack={yardCardStack}
            setDeckCardStack={setDeckCardStack}
            setYardCardStack={setYardCardStack}
          />
          <Col></Col>
          {/*  Foundation cards */}
          <Col>
            <Droppable id="foundationHearts">
              <Foundation
                type={Suite.hearts}
                foundationStack={foundationHearts}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="foundationDiamonds">
              <Foundation
                type={Suite.diamonds}
                foundationStack={foundationDiamonds}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="foundationClubs">
              <Foundation
                type={Suite.clubs}
                foundationStack={foundationClubs}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="foundationSpades">
              <Foundation
                type={Suite.spades}
                foundationStack={foundationSpades}
              />
            </Droppable>
          </Col>
        </Row>
        <Row className="p-5">
          {/*  Tableau cards */}
          <Col>
            <Droppable id="Tab1">
              <Tableau
                id="Tab1"
                tableauStack={tableauCardStack1}
                setStack={setTableauCardStack1}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="Tab2">
              <Tableau
                id="Tab2"
                tableauStack={tableauCardStack2}
                setStack={setTableauCardStack2}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="Tab3">
              <Tableau
                id="Tab3"
                tableauStack={tableauCardStack3}
                setStack={setTableauCardStack3}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="Tab4">
              <Tableau
                id="Tab4"
                tableauStack={tableauCardStack4}
                setStack={setTableauCardStack4}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="Tab5">
              <Tableau
                id="Tab5"
                tableauStack={tableauCardStack5}
                setStack={setTableauCardStack5}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="Tab6">
              <Tableau
                id="Tab6"
                tableauStack={tableauCardStack6}
                setStack={setTableauCardStack6}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
          <Col>
            <Droppable id="Tab7">
              <Tableau
                id="Tab7"
                tableauStack={tableauCardStack7}
                setStack={setTableauCardStack7}
                onDragging={handleDragging}
              />
            </Droppable>
          </Col>
        </Row>
      </Container>
    </DndContext>
  );
};

export default Solitaire;
