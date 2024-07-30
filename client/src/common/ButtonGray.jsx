import { Link } from "react-router-dom";

const ButtonGray = ({ text, link }) => {
  return (
    <Link to={link}>
      <button className='bg-gray-200 w-[150px] rounded-3xl px-10 py-2 hover:bg-orange-600 hover:text-white transition-smooth'>
        {text}
      </button>
    </Link>
  );
};

export default ButtonGray;
