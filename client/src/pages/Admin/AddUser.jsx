import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { usersFetch } from './../../redux/user/userSlice';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GoPlusCircle } from "react-icons/go";

const AddUser = () => {

  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dodane stany walidacji
  const [formErrors, setFormErrors] = useState({});

  // image upload

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL});
        })
      }
    )
  }

  //

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (['street', 'streetNumber', 'postalCode', 'city'].includes(id)) {
      // Zagnieżdżanie danych adresowych w obiekcie 'address'
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [id]: value
        }
      }));
    } else if (['companyName', 'companyStreet', 'companyStreetNumber', 'companyPostalCode', 'companyCity', 'companyNIP'].includes(id)) {
      // Zagnieżdżanie danych firmy w obiekcie 'company'
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          [id.replace('company', '').toLowerCase()]: value // Usuwa 'company' z id i zapisuje jako klucz
        }
      }));
    } else {
      // Zwykłe pola (nazwa użytkownika, hasło, email, itp.)
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };

  // Funkcja walidująca formularz
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
      setLoading(true)

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      dispatch(usersFetch());
      navigate('/admin/users')

    } catch (error) {
      setLoading(false);
      setError('Błąd rejestracji. Wybierz inną nazwę użytkownika');
      console.log('inner error is', error);
    }
  }

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Dodaj użytkownika</p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-4 rounded border-[1px] mt-5'>
        <p className='text-md font-bold mb-2'>Dane</p>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 mb-2' htmlFor='username'>
              Nazwa użytkownika
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='username'
              placeholder='Podaj imię i nazwisko'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.username && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.username}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='password'>
              Hasło
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='password'
              placeholder='Podaj hasło'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.password && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.password}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='email'>
              E-mail
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='email'
              placeholder='Podaj adres email'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.email && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='telephone'>
              Telefon
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='telephone'
              placeholder='Podaj nr telefonu'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='status'>
              Status
            </label>
            <select
              onChange={handleChange}
              id='status'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>


          <div>
            <label className='block text-gray-600 mb-2' htmlFor='avatar'>
              Avatar
            </label>
            <input
              onChange={(e)=>setFile(e.target.files[0])}
              type='file'
              accept='image/*'
              id='avatar'
              className='w-full p-2 border border-gray-300 rounded-lg'
            />
            <p className='text-sm self-center mt-2'>
              {fileUploadError
                ?
                  (<span className='text-red-700'>Error image upload (image must be lass than 2mb)</span>)
                : filePerc > 0 && filePerc < 100 ?
                  (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>)
                : filePerc === 100 ?
                  (<span className='text-green-700'>Image succesfully uploaded!</span>)
                :
                  ('')
              }
            </p>
          </div>

          <div className='col-span-2'>
            <p className='text-md font-bold mb-2 mt-4'>Adres korespondencyjny</p>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-600 mb-2' htmlFor='street'>
                  Ulica
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='street'
                  placeholder='Podaj ulicę'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='streetNumber'>
                  Nr
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='streetNumber'
                  placeholder='Podaj nr'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='postalCode'>
                  Kod pocztowy
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='postalCode'
                  placeholder='Podaj kod pocztowy'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='city'>
                  Miasto
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='city'
                  placeholder='Podaj miasto'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>
            </div>
          </div>

          <div className='col-span-2'>
            <p className='text-md font-bold mb-2 mt-5'>Dane firmy</p>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyName'>
                  Nazwa firmy
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='companyName'
                  placeholder='Podaj nazwę firmy'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyStreet'>
                  Ulica
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='companyStreet'
                  placeholder='Podaj ulicę'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyStreetNumber'>
                  Nr
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='companyStreetNumber'
                  placeholder='Podaj nr'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyPostalCode'>
                  Kod pocztowy
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='companyPostalCode'
                  placeholder='Podaj kod pocztowy'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyCity'>
                  Miasto
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='companyCity'
                  placeholder='Podaj miasto'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyNIP'>
                  NIP
                </label>
                <input
                  onChange={handleChange}
                  type='text'
                  id='companyNIP'
                  placeholder='Podaj NIP'
                  className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center mt-10 mb-5'>
          <button
            className='bg-orange-600 text-white rounded-lg p-2 py-3 hover:bg-gray-800 transition-smooth flex items-center'>
            <GoPlusCircle className='mr-2 text-xl' />
            <p>Dodaj</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
