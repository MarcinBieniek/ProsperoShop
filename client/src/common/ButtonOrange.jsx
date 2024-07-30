import { Link } from "react-router-dom";

const ButtonOrange = ({ text, link }) => {
  return (
    <button
      className='bg-orange-600 w-[150px]  text-white rounded-3xl px-10 py-2 hover:bg-gray-800 transition-smooth'
    >
      <Link to='/'>{text}</Link>
    </button>
  );
};

export default ButtonOrange;
