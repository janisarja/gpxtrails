'use client';

const ButtonLarge = ({ text, onClick=() => {}, type = "button", ...rest }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className="px-3 py-2 my-3 bg-gray-900 text-white rounded-sm hover:bg-gray-800 cursor-pointer"
      {...rest}
    >
      {text}
    </button>
  )
}

export default ButtonLarge;
