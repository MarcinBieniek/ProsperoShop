import { GoPlusCircle } from "react-icons/go";

const AddUser = () => {
  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Dodaj użytkownika</p>
      </div>

      <form className='bg-white p-4 rounded border-[1px] mt-5'>
        <p className='text-md font-bold mb-2'>Dane</p>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 mb-2' htmlFor='username'>
              Nazwa użytkownika
            </label>
            <input
              type='text'
              id='username'
              placeholder='Podaj imię i nazwisko'
              className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='password'>
              Hasło
            </label>
            <input
              type='text'
              id='password'
              placeholder='Podaj hasło'
              className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='email'>
              E-mail
            </label>
            <input
              type='text'
              id='email'
              placeholder='Podaj adres email'
              className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='telephone'>
              Telefon
            </label>
            <input
              type='text'
              id='telephone'
              placeholder='Podaj nr telefonu'
              className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='status'>
              Status
            </label>
            <select
              id='status'
              className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
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
              type='file'
              id='avatar'
              className='w-full p-2 border border-gray-300 rounded-lg'
            />
          </div>

          <div className='col-span-2'>
            <p className='text-md font-bold mb-2 mt-4'>Adres korespondencyjny</p>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-600 mb-2' htmlFor='street'>
                  Ulica
                </label>
                <input
                  type='text'
                  id='street'
                  placeholder='Podaj ulicę'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='streetNumber'>
                  Nr
                </label>
                <input
                  type='text'
                  id='streetNumber'
                  placeholder='Podaj nr'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='postalCode'>
                  Kod pocztowy
                </label>
                <input
                  type='text'
                  id='postalCode'
                  placeholder='Podaj kod pocztowy'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='city'>
                  Miasto
                </label>
                <input
                  type='text'
                  id='city'
                  placeholder='Podaj miasto'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
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
                  type='text'
                  id='companyName'
                  placeholder='Podaj nazwę firmy'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyStreet'>
                  Ulica
                </label>
                <input
                  type='text'
                  id='companyStreet'
                  placeholder='Podaj ulicę'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyStreetNumber'>
                  Nr
                </label>
                <input
                  type='text'
                  id='companyStreetNumber'
                  placeholder='Podaj nr'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyPostalCode'>
                  Kod pocztowy
                </label>
                <input
                  type='text'
                  id='companyPostalCode'
                  placeholder='Podaj kod pocztowy'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyCity'>
                  Miasto
                </label>
                <input
                  type='text'
                  id='companyCity'
                  placeholder='Podaj miasto'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>

              <div>
                <label className='block text-gray-600 mb-2' htmlFor='companyNIP'>
                  NIP
                </label>
                <input
                  type='text'
                  id='companyNIP'
                  placeholder='Podaj NIP'
                  className='w-full p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex justify-center mt-10 mb-5'>
          <button
            className='bg-orange-600 text-white rounded-lg p-2 hover:bg-gray-800 transition-smooth flex items-center'>
            <GoPlusCircle className='mr-2 text-xl' />
            <p>Dodaj</p>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddUser;
