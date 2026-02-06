const ButtonLarge = ({ text, onClick=() => {}, type = "button" }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className="px-3 py-2 my-3 mr-3 bg-gray-900 text-white rounded-sm hover:bg-gray-800 cursor-pointer">
      {text}
    </button>
  )
}

export default ButtonLarge;
