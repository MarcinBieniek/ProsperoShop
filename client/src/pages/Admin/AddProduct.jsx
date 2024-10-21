import { useEffect, useState, useRef } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const AddProduct = () => {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Bramy',
    subcategory: 'Bramy segmentowe',
    description: '',
    details: ''
  });

  console.log('formData', formData);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === 'category') {
      const firstSubcategory = getFirstSubcategory(value);
      setFormData((prevData) => ({
        ...prevData,
        subcategory: firstSubcategory,
      }));
    }
  };

  const handleDescriptionChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

    const handleDetailsChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      details: content,
    }));
  };

  const getFirstSubcategory = (category) => {
    switch (category) {
      case 'Bramy':
        return 'Bramy segmentowe';
      case 'Automatyka':
        return 'Bramy garażowe';
      case 'Akcesoria':
        return 'Piloty';
      case 'Ogrodzenia':
        return 'Panelowe';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Dodaj produkt</p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-4 rounded border-[1px] mt-5'>
        <p className='text-md font-bold mb-2'>Dane</p>

        <div className='grid grid-cols-2 gap-4'>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='name'>
              Nazwa produktu
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='name'
              placeholder='Wpisz nazwę produktu'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='category'>
              Wybierz kategorię
            </label>
            <select
              onChange={handleChange}
              id='category'
              value={formData.category}
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            >
              <option value='Bramy'>Bramy</option>
              <option value='Automatyka'>Automatyka</option>
              <option value='Akcesoria'>Akcesoria</option>
              <option value='Ogrodzenia'>Ogrodzenia</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='subcategory'>
              Wybierz podkategorię
            </label>
            <select
              onChange={handleChange}
              id='subcategory'
              value={formData.subcategory}
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            >
              {formData.category === 'Bramy' && (
                <>
                  <option value='Bramy segmentowe'>Bramy segmentowe</option>
                  <option value='Bramy rozwierne'>Bramy rozwierne</option>
                  <option value='Bramy uchylne'>Bramy uchylne</option>
                  <option value='Bramy roletowe'>Bramy roletowe</option>
                  <option value='Bramy przemysłowe'>Bramy przemysłowe</option>
                </>
              )}

              {formData.category === 'Automatyka' && (
                <>
                  <option value='Bramy garażowe'>Bramy garażowe</option>
                  <option value='Szyny do napędów'>Szyny do napędów</option>
                  <option value='Siłowniki przemysłowe'>Siłowniki przemysłowe</option>
                  <option value='Bramy przesuwne'>Bramy przesuwne</option>
                  <option value='Bramy 2-skrzydłowe'>Bramy 2-skrzydłowe</option>
                </>
              )}

              {formData.category === 'Akcesoria' && (
                <>
                  <option value='Piloty'>Piloty</option>
                  <option value='Fotokomórki'>Fotokomórki</option>
                  <option value='Radioodbiorniki'>Radioodbiorniki</option>
                </>
              )}

              {formData.category === 'Ogrodzenia' && (
                <>
                  <option value='Panelowe'>Panelowe</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='productCode'>
              Kod produktu
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='productCode'
              placeholder='Wpisz kod produktu'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='producer'>
              Producent
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='producer'
              placeholder='Wpisz nazwę producenta'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='price'>
              Cena
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='price'
              placeholder='Wpisz cenę'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='discountedPrice'>
              Obniżona cena
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='discountedPrice'
              placeholder='Wpisz cenę'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='delivery'>
              Dostawa
            </label>
            <input
              onChange={handleChange}
              type='text'
              id='delivery'
              placeholder='Podaj czas dostawy'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='promotion'>
              Promocja
            </label>
            <select
              onChange={handleChange}
              id='promotion'
              value={formData.promotion || false}
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            >
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='sale'>
              Wyprzedaż
            </label>
            <select
              onChange={handleChange}
              id='sale'
              value={formData.sale || false}
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            >
              <option value={false}>Nie</option>
              <option value={true}>Tak</option>
            </select>
          </div>
        </div>

        <div>
          <label className='block text-gray-600 mb-2 mt-5' htmlFor='shortDescription'>
            Krótki opis
          </label>
          <textarea
            onChange={handleChange}
            id='shortDescription'
            placeholder='Podaj opis'
            className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            rows='4'
          />
        </div>

        <div>
          <label className='block text-gray-600 mb-2 mt-5' htmlFor='description'>
            Opis szczegółowy
          </label>
          <SunEditor
            onChange={handleDescriptionChange}
            setOptions={{
              buttonList: [
                ['undo', 'redo', 'bold', 'italic', 'underline', 'font', 'fontSize', 'formatBlock'],
                ['list', 'link', 'image'],
              ],
            }}
            defaultValue="<p>Wprowadź opis...</p>"
          />
        </div>

        <div>
          <label className='block text-gray-600 mb-2 mt-5' htmlFor='details'>
            Specyfikacja
          </label>
          <SunEditor
            onChange={handleDetailsChange}
            setOptions={{
              buttonList: [
                ['undo', 'redo', 'bold', 'italic', 'underline', 'font', 'fontSize', 'formatBlock'],
                ['list', 'link', 'image'],
              ],
            }}
            defaultValue="<p>Podaj specyfikację...</p>"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;