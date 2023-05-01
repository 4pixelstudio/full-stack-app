import { useState } from "react";
import data from "../../data/data.json";
import Card from "../../components/Card/Card";
import CardInterface from "../../interfaces/CardInterface";

function DraggableCards() {
  const [cards, setCards] = useState<CardInterface[]>(data);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newIndex: number
  ) => {
    const draggedIndex = Number(event.dataTransfer.getData("text/plain"));
    const newCards = [...cards];
    const draggedCard = newCards[draggedIndex];

    newCards.splice(draggedIndex, 1);
    newCards.splice(newIndex, 0, draggedCard);

    setCards(newCards);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {cards.map((card, index) => (
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          key={card.type}
          style={{
            flexBasis: "calc(33.33% - 10px)",
            margin: "5px",
          }}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}

export default DraggableCards;
