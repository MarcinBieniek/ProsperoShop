import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { usersFetch } from './../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { GoPlusCircle } from "react-icons/go";

const EditUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);

        setFormData({
          username: data.username || '',
          email: data.email || '',
          telephone: data.telephone || '',
          status: data.status || 'user',
          avatar: data.avatar || '/user-icon.png',
          address: {
            street: data.address?.street || '',
            streetNumber: data.address?.streetNumber || '',
            postalCode: data.address?.postalCode || '',
            city: data.address?.city || '',
          },
          company: {
            name: data.company?.name || '',
            street: data.company?.street || '',
            streetNumber: data.company?.streetNumber || '',
            postalCode: data.company?.postalCode || '',
            city: data.company?.city || '',
            nip: data.company?.nip || '',
          },
        });
      } else {
        throw new Error(data.message || 'Nie udało się pobrać danych użytkownika');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

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

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (['street', 'streetNumber', 'postalCode', 'city'].includes(id)) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [id]: value
        }
      }));
    } else if (id === 'companyName') {
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          name: value
        }
      }));
    } else if (id === 'companyStreet') {
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          street: value
        }
      }));
    } else if (id === 'companyStreetNumber') {
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          streetNumber: value
        }
      }));
    } else if (id === 'companyPostalCode') {
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          postalCode: value
        }
      }));
    } else if (id === 'companyCity') {
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          city: value
        }
      }));
    } else if (id === 'companyNIP') {
      setFormData((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          nip: value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = 'Nazwa użytkownika jest wymagana';
    } else if (formData.username.length < 3) {
      errors.username = 'Nazwa użytkownika musi mieć co najmniej 3 znaki';
    }

    if (!formData.email) {
      errors.email = 'E-mail jest wymagany';
    } else if (!formData.email.includes('@')) {
      errors.email = 'E-mail musi zawierać znak "@"';
    } else if (formData.email.length < 3) {
      errors.email = 'E-mail musi mieć co najmniej 3 znaki';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const dataToUpdate = { ...formData };
      delete dataToUpdate.password;

      const res = await fetch(`/api/user/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate)
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
      setError('Błąd aktualizacji użytkownika');
      console.log('Błąd aktualizacji: ', error);
    }
  }

  const handleDeleteAvatar = () => {
    setFormData({ ...formData, avatar: '/user-icon.png' });
    setFile(undefined)
  };

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Edytuj użytkownika</p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-4 rounded border-[1px] mt-5'>
        <p className='text-md font-bold mb-2'>Dane</p>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 mb-2' htmlFor='username'>
              Nazwa użytkownika
            </label>
            <input
              value={formData.username || ''}
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
            <label className='block text-gray-600 mb-2' htmlFor='email'>
              E-mail
            </label>
            <input
              value={formData.email || ''}
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
              value={formData.telephone || ''}
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
              value={formData.status || ''}
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

          <div>
            <label className='block text-gray-600 mb-2'>Podgląd</label>
            <div className='flex justify-center items-center'>
              <img
                src={formData.avatar || '/user-icon.png'}
                className='w-40 h-40 object-cover'
                alt='Avatar preview'
              />
              {formData.avatar && formData.avatar !== '/user-icon.png' && (
                <button
                  type='button'
                  onClick={handleDeleteAvatar}
                  className='ml-4 p-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition'
                >
                  Usuń zdjęcie
                </button>
              )}
            </div>
          </div>

          <div className='col-span-2'>
            <p className='text-md font-bold mb-2 mt-4'>Adres korespondencyjny</p>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-600 mb-2' htmlFor='street'>
                  Ulica
                </label>
                <input
                  value={formData.address?.street || ''}
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
                  value={formData.address?.streetNumber || ''}
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
                  value={formData.address?.postalCode || ''}
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
                  value={formData.address?.city || ''}
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
                  value={formData.company?.name || ''}
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
                  value={formData.company?.street || ''}
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
                  value={formData.company?.streetNumber || ''}
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
                  value={formData.company?.postalCode || ''}
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
                  value={formData.company?.city || ''}
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
                  value={formData.company?.nip || ''}
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
            <p>Edytuj</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
