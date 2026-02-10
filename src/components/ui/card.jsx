import { useId } from 'react';

const Card = ({ title, children }) => {
  const headingId = useId();

  return (
    <section
      className="bg-white rounded-lg shadow-md p-4 m-10 max-w-md mx-auto text-center"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </section>
  );
}

export default Card;
