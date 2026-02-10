import { useId } from 'react';
import ButtonLarge from "@/src/components/ui/button-large";

const TrailForm = ({ 
    buttonText, 
    name, setName, 
    description, setDescription,
    handleSubmit
  }) => {
  const nameId = useId();
  const descriptionId = useId();

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="sr-only">Trail details</legend>
        <label className="block" htmlFor={nameId}>
          <span className="text-sm font-medium text-gray-700">Trail Name</span>
        </label>
        <input 
          id={nameId}
          className="mt-1 block w-full rounded border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block" htmlFor={descriptionId}>
          <span className="text-sm font-medium text-gray-700">Description</span>
        </label>
        <textarea 
          id={descriptionId}
          className="mt-1 block w-full rounded border border-gray-200 p-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ButtonLarge type="submit" text={buttonText} />
      </fieldset>
    </form>
  );
}

export default TrailForm;
