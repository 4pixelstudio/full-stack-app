import { useState } from "react";
import data from "../../data/data.json";
import Card from "../../components/Card/Card";
import CardInterface from "../../interfaces/CardInterface";

function CardList() {
  const [cards, _] = useState<CardInterface[]>(data);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {cards.map((card) => (
        <Card key={card.type} card={card} />
      ))}
    </div>
  );
}

export default CardList;
