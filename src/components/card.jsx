const Card = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-10 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}

export default Card;
