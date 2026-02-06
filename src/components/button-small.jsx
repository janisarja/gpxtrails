const ButtonSmall = ({ text, onClick=() => {}, type = "button" }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className="px-2 py-1 my-3 bg-gray-100 rounded-sm border text-sm hover:bg-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
      {text}
    </button>
  )
}

export default ButtonSmall;
