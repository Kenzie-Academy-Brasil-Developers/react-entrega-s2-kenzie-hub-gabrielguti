import { useEffect } from "react";
import "./styles.css";
const Card = ({ card, func }) => {
  useEffect(() => {
    console.log(card);
  }, [card]);

  console.log(card.map((item) => item.title));
  return (
    <>
      {card.map((item, index) => (
        <div key={item.id} className="Card">
          {item.title}
          <button key={index} onClick={func}></button>
        </div>
      ))}
    </>
  );
};

export default Card;
