import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const Rejestracja = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('final error is', error)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/login')

    } catch (error) {
      setLoading(false);
      setError('Błąd rejestracji. Wybierz inną nazwę użytkownika');
      console.log('inner error is', error);
    }
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Masz już konto?</p>
        <Link to={'/login'}>
          <span className='text-blue-700'>Zaloguj</span>
        </Link>
      </div>
      {error && error.includes('required') && <p className='text-red-500 mt-5'>Błąd rejestracji. Uzupełnij wszystkie dane.</p>}
      {error && error.includes('username') && !error.includes('required') && <p className='text-red-500 mt-5'>Bład rejestracji. Użytkownik o tej nazwie istnieje. Wybierz inną nazwę.</p>}
      {error && error.includes('email') && <p className='text-red-500 mt-5'>Błąd rejestracji. Adres email jest już zarejestrowany. Wybierz inny adres.</p>}
    </div>
  );
}

export default Rejestracja