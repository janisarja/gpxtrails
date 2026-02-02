import ButtonLarge from "./button-large";

const TrailForm = ({ 
    buttonText, 
    name, setName, 
    description, setDescription,
    handleSubmit
  }) => {

  return (
    <form
        onSubmit={handleSubmit}
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Trail Name</span>
          <input 
            className="mt-1 block w-full rounded border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Description</span>
          <textarea 
            className="mt-1 block w-full rounded border border-gray-200 p-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <ButtonLarge type="submit" text={buttonText} />
      </form>
  );
}

export default TrailForm;
