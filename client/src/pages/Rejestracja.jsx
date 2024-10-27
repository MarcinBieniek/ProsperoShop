import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { MdKeyboardArrowRight } from "react-icons/md";

const Rejestracja = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log('final error is', error)

  // Dodane stany walidacji
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //funkcja walidująca formularz
  const validateForm = () => {
    const errors = {};

    // Walidacja nazwy użytkownika
    if (!formData.username) {
      errors.username = 'Nazwa użytkownika jest wymagana';
    } else if (formData.username.length < 3) {
      errors.username = 'Nazwa użytkownika musi mieć co najmniej 3 znaki';
    }

    // Walidacja hasła
    if (!formData.password) {
      errors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 3) {
      errors.password = 'Hasło musi mieć co najmniej 3 znaki';
    }

    // Walidacja e-mail
    if (!formData.email) {
      errors.email = 'E-mail jest wymagany';
    } else if (!formData.email.includes('@')) {
      errors.email = 'E-mail musi zawierać znak "@"';
    } else if (formData.email.length < 3) {
      errors.email = 'E-mail musi mieć co najmniej 3 znaki';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Zwraca true, jeśli nie ma błędów
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Nie wysyłaj formularza, jeśli są błędy walidacji
    }

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
    <>

      <div className='container text-gray-800'>
        <div className='pt-5 pb-9 flex items-center text-gray-800'>
          <p>Strona główna</p>
          <MdKeyboardArrowRight className='px-1 text-3xl' />
          <p>Rejestracja</p>
        </div>

        <div className='flex mb-32'>

          <div className='w-1/2 p-5 px-10'>
            <div className='relative '>
              <h1 className='text-3xl pb-4 border-b-[1px] border-gray-300'>Utwórz nowe konto</h1>
              <div className='absolute h-[2px] w-[150px] bg-orange-500 bottom-[1px]'></div>
            </div>
            <p className='py-3 pt-5'>Witamy w naszym sklepie.</p>

            <div className='py-3 w-full mx-auto'>
              <form onSubmit={handleSubmit} className='flex flex-col'>
                <input
                  type='text'
                  placeholder='Nazwa użytkownika'
                  className='border border-gray-300 p-3 rounded-3xl focus:outline-none'
                  id='username'
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <p className='text-red-700 text-sm mt-2 mb-5'>{formErrors.username}</p>
                )}
                <input
                  type='email'
                  placeholder='Adres email'
                  className='border border-gray-300 p-3 rounded-3xl focus:outline-none'
                  id='email'
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className='text-red-700 text-sm mt-2 mb-5'>{formErrors.email}</p>
                )}
                <input
                  type='password'
                  placeholder='Hasło'
                  className='border border-gray-300 p-3 rounded-3xl focus:outline-none'
                  id='password'
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <p className='text-red-700 text-sm mt-2 mb-5'>{formErrors.password}</p>
                )}

                <button
                  disabled={loading}
                  className='bg-orange-600 hover:bg-gray-800 text-white p-3 rounded-3xl uppercase hover:opacity-95 disabled:opacity-80 transition-smooth'
                >
                  {loading ? 'Loading...' : 'Zarejestruj'}
                </button>

              </form>
              {error && error.includes('required') && <p className='text-red-500 mt-5'>Błąd rejestracji. Uzupełnij wszystkie dane.</p>}
              {error && error.includes('username') && !error.includes('required') && <p className='text-red-500 mt-5'>Bład rejestracji. Użytkownik o tej nazwie istnieje. Wybierz inną nazwę.</p>}
              {error && error.includes('email') && <p className='text-red-500 mt-5'>Błąd rejestracji. Adres email jest już zarejestrowany. Wybierz inny adres.</p>}
            </div>
          </div>

          <div className='w-1/2 p-5 px-10 border-l-[1px] border-gray-300'>
            <div className='relative '>
              <h1 className='text-3xl pb-4 border-b-[1px] border-gray-300'>Zaloguj się</h1>
              <div className='absolute h-[2px] w-[150px] bg-orange-500 bottom-[1px]'></div>
            </div>
            <p className='py-5'>Posiadasz już konto w naszym sklepie?</p>

            <Link to='/login' className='mb-5'>
              <p className='w-full text-center bg-orange-600 hover:bg-gray-800 text-white py-3 mt-1 rounded-3xl uppercase hover:opacity-95 disabled:opacity-80 transition-smooth'>Zaloguj</p>
            </Link>

            <div className='w-full mt-6'>
              <OAuth  />
            </div>
          </div>

        </div>

      </div>



    </>
  );
}

export default Rejestracja