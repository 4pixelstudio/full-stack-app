import CardInterface from "../../interfaces/CardInterface";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";

interface CardProps {
  card: CardInterface;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div>
      <p>{card.title}</p>
      <LazyLoadImage
        src={`https://placedog.net/640/480?r&type=${card.type}`}
        alt="image"
      />
    </div>
  );
};

export default Card;
