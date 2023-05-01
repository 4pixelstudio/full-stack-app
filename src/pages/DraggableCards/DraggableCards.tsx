import { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/Card";
import CardInterface from "../../interfaces/CardInterface";
import FullScreenImage from "../../components/FullScreenImage/FullScreenImage";
import CardService from "../../services/CardService";
import { SAVE_INTERVAL_IN_MILLISECONDS } from "../../constants/constants";
import { formatDate } from "../../utils/helpers";
import Spinner from "../../components/Spinner/Spinner";

function DraggableCards() {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [image, setImage] = useState("");
  const cardsRef = useRef(cards);
  const originalCardsRef = useRef(cards);
  const [lastSave, setLastSave] = useState<string>("-");
  const [saving, setSaving] = useState<boolean>(false);
  const cardService = new CardService();

  useEffect(() => {
    fetchCards();

    const intervalId = setInterval(handleSave, SAVE_INTERVAL_IN_MILLISECONDS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const hasOrderChanged = () =>
    JSON.stringify(cardsRef.current) !==
    JSON.stringify(originalCardsRef.current);

  const fetchCards = async () => {
    try {
      const cards = await cardService.get();
      setCards(cards);
      originalCardsRef.current = cards;
    } catch (e) {
      // TODO: Handle exception
    }
  };

  const handleSave = async () => {
    if (hasOrderChanged()) {
      try {
        setSaving(true);
        await cardService.update(cardsRef.current);
        setLastSave(formatDate(new Date()));
        originalCardsRef.current = cardsRef.current;
      } catch (e) {
        // TODO: Handle exception - Notify the user and reset the order of cards / retry
        setCards(originalCardsRef.current);
      } finally {
        setSaving(false);
      }
    }
  };

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLImageElement) {
      setImage(e.target.src);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
        onClick={handleCardClick}
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

      <div>Last Save: {saving ? <Spinner show={true} /> : lastSave}</div>

      <FullScreenImage
        src={image}
        onClose={() => {
          setImage("");
        }}
      />
    </>
  );
}

export default DraggableCards;
