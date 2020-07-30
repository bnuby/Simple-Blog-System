const Card = ({ h1, content }: { h1: string; content: string }) => {
  return (
    <div>
      <h1>{h1}</h1>
      <div>{content}</div>
    </div>
  );
};

export default Card;
