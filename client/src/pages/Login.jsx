import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const Login = () => {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart())

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }

      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) {
      dispatch(signInFailure('Błąd logowania.'))
    }
  }


  return (
    <div className='container text-gray-800'>
      <div className='pt-5 pb-9 flex items-center text-gray-800'>
        <p>Strona główna</p>
        <MdKeyboardArrowRight className='px-1 text-3xl' />
        <p>Logowanie</p>
      </div>

      <div className='flex mb-32'>

        <div className='w-1/2 p-5 px-10'>
          <div className='relative '>
            <h1 className='text-3xl pb-4 border-b-[1px] border-gray-300'>Logowanie</h1>
            <div className='absolute h-[2px] w-[150px] bg-orange-500 bottom-[1px]'></div>
          </div>
          <p className='py-3 pt-5'>Witamy w naszym sklepie.</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 pt-4'>
            <input
              type='email'
              placeholder='Adres email'
              className='border border-gray-300 p-3 rounded-3xl focus:outline-none'
              id='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Hasło'
              className='border border-gray-300 p-3 rounded-3xl focus:outline-none'
              id='password'
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className='bg-orange-600 hover:bg-gray-800 text-white p-3 rounded-3xl uppercase hover:opacity-95 disabled:opacity-80 transition-smooth'
            >
              {loading ? 'Loading...' : 'Zaloguj'}
            </button>
            <OAuth />
          </form>
          {error && <p className='text-red-500 mt-5'>Błąd logowania. Wprowadź prawidłowe dane.</p>}
          <div className='flex justify-between mt-5'>
            <Link to='/' className='hover:text-orange-600 transition-smooth'>
              Powrót do sklepu
            </Link>
            <div className=''>
              <Link to={'/sign-in'}>
                <span className='hover:text-orange-600 transition-smooth'>Zresetuj hasło</span>
              </Link>
            </div>

          </div>

        </div>

        <div className='w-1/2 p-5 px-10 border-l-[1px] border-gray-300'>
          <div className='relative '>
            <h1 className='text-3xl pb-4 border-b-[1px] border-gray-300'>Rejestracja</h1>
            <div className='absolute h-[2px] w-[150px] bg-orange-500 bottom-[1px]'></div>
          </div>
          <p className='pt-5'>Zachęcamy do rejestracji!</p>
          <p className='pt-5 text-xl'>Posiadając konto w naszym sklepie:</p>

          <div className='flex items-center mt-5'>
            <FaCheck className='text-sm text-green-500 mr-3' />
            <p>Sprawniej przejdziesz proces zamówienia.</p>
          </div>
          <div className='flex items-center mt-5'>
            <FaCheck className='text-sm text-green-500 mr-3' />
            <p>Zapiszesz interesujące cię produkty na liście ulubionych.</p>
          </div>
          <div className='flex items-center mt-5'>
            <FaCheck className='text-sm text-green-500 mr-3' />
            <p>Będziesz mógł śledzić status zamówienia.</p>
          </div>
          <div className='flex items-center mt-5'>
            <FaCheck className='text-sm text-green-500 mr-3' />
            <p>Z łatwością przejrzysz historię zamówień.</p>
          </div>

          <Link to='/rejestracja' >
            <p className='w-full text-center bg-orange-600 hover:bg-gray-800 text-white p-3 mt-7 rounded-3xl uppercase hover:opacity-95 disabled:opacity-80 transition-smooth'>Zarejestruj</p>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login