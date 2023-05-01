import CardInterface from "../../interfaces/CardInterface";

interface CardProps {
  card: CardInterface;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div
      style={{
        flexBasis: "calc(33.33% - 10px)",
        margin: "5px",
      }}
    >
      <p>{card.title}</p>
      <img
        src={`https://placedog.net/640/480?r&type=${card.type}`}
        alt="image"
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default Card;
