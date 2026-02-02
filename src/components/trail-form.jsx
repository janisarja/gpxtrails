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
        <label>
          Trail Name:
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">{buttonText}</button>
      </form>
  );
}

export default TrailForm;
