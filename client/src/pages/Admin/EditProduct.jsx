import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { productsFetch } from '../../redux/products/productsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [files, setFiles] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Bramy',
    subcategory: 'Bramy segmentowe',
    shortDescription: '',
    description: '',
    details: '',
    imageUrls: [],
    promotion: false,
    sale: false
  });
  const [productData, setProductData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Nowe stany dla SunEditor: description i details
  const [descriptionLoaded, setDescriptionLoaded] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/product/get/${id}`);
      const data = await response.json();

      if (response.ok) {
        setProductData(data);

        setFormData({
          name: data.name || '',
          category: data.category || 'Bramy',
          subcategory: data.subcategory || 'Bramy segmentowe',
          productCode: data.productCode || '',
          producer: data.producer || '',
          price: data.price || '',
          discountedPrice: data.discountedPrice || '',
          shortDescription: data.shortDescription || '',
          description: data.description || '',
          details: data.details || '',
          imageUrls: data.imageUrls || [],
          delivery: data.delivery || '',
          promotion: data.promotion || false,
          sale: data.sale || false,

        });

        setDescriptionLoaded(false);
        setDetailsLoaded(false);

      } else {
        throw new Error(data.message || 'Nie udało się pobrać danych produktu');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

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

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          imageUrls: undefined,
        }));
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Maksymalny rozmiar zdjęcia, to 2 MB');
        setUploading(false);
        console.log('image error is', err)
      })
    } else {
      setImageUploadError('Możesz załadować max. 3 zdjęcia');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
      )
    })
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Nazwa produktu jest wymagana';
    } else if (formData.name.length < 3) {
      errors.name = 'Nazwa produktu musi mieć co najmniej 3 znaki';
    }

    if (!formData.producer) {
      errors.producer = 'Nazwa producenta jest wymagana';
    } else if (formData.producer.length < 3) {
      errors.name = 'Nazwa producenta musi mieć co najmniej 3 znaki';
    }

    if (!formData.price) {
      errors.price = 'Cena podstawowa jest wymagana';
    } else if (isNaN(formData.price) || formData.price <= 0) {
      errors.price = 'Cena musi być liczbą większą od zera';
    }

    if (formData.discountedPrice) {
      if (isNaN(formData.discountedPrice) || formData.discountedPrice <= 0) {
        errors.discountedPrice = 'Cena musi być liczbą większą od zera';
      } else if (parseFloat(formData.price) <= parseFloat(formData.discountedPrice)) {
        errors.discountedPrice = 'Cena po rabacie musi być niższa od podstawowej';
      }
    }

    if (!formData.shortDescription) {
      errors.shortDescription = 'Opis produktu jest wymagany';
    } else if (formData.shortDescription.length < 3) {
      errors.shortDescription = 'Opis produktu musi mieć co najmniej 3 znaki';
    }

    if (!formData.description) {
      errors.description = 'Opis produktu jest wymagany';
    } else if (formData.description.length < 10) {
      errors.description = 'Opis produktu musi mieć co najmniej 3 znaki';
    }

    if (formData.imageUrls.length < 1) {
      errors.imageUrls = 'Musisz dodać przynajmniej 1 zdjęcie';
    }

    if (!formData.delivery) {
      errors.delivery = 'Czas dostawy jest wymagany';
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
      setError(false);

      const res = await fetch(`/api/product/${productData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        })
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      dispatch(productsFetch())
      navigate(`/admin/products`);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  // Refs do dwóch edytorów: description i details
  const descriptionEditorRef = useRef(null);
  const detailsEditorRef = useRef(null);

  // Ustawienie treści edytorów po załadowaniu danych
  useEffect(() => {
    if (descriptionEditorRef.current && productData && !descriptionLoaded) {
      descriptionEditorRef.current.setContents(formData.description || '');
      setDescriptionLoaded(true);
    }
    if (detailsEditorRef.current && productData && !detailsLoaded) {
      detailsEditorRef.current.setContents(formData.details || '');
      setDetailsLoaded(true);
    }
  }, [formData.description, formData.details, productData, descriptionLoaded, detailsLoaded]);

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Edytuj produkt</p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white p-4 rounded border-[1px] mt-5'>
        <p className='text-md font-bold mb-2'>Dane</p>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-gray-600 mb-2' htmlFor='name'>
              Nazwa produktu
            </label>
            <input
              value={formData.name || ''}
              onChange={handleChange}
              type='text'
              id='name'
              placeholder='Wpisz nazwę produktu'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.name && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.name}</p>
            )}
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
                  <option value='Bramy dwuskrzydłowe'>Bramy dwuskrzydłowe</option>
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
              value={formData.productCode || ''}
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
              value={formData.producer || ''}
              onChange={handleChange}
              type='text'
              id='producer'
              placeholder='Wpisz nazwę producenta'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.producer && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.producer}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='price'>
              Cena
            </label>
            <input
              value={formData.price || ''}
              onChange={handleChange}
              type='text'
              id='price'
              placeholder='Wpisz cenę'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.price && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.price}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='discountedPrice'>
              Obniżona cena
            </label>
            <input
              value={formData.discountedPrice || ''}
              onChange={handleChange}
              type='text'
              id='discountedPrice'
              placeholder='Wpisz cenę'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.discountedPrice && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.discountedPrice}</p>
            )}
          </div>

          <div>
            <label className='block text-gray-600 mb-2' htmlFor='delivery'>
              Dostawa
            </label>
            <input
              value={formData.delivery || ''}
              onChange={handleChange}
              type='text'
              id='delivery'
              placeholder='Podaj czas dostawy'
              className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            />
            {formErrors.delivery && (
              <p className='text-red-700 text-sm mt-1'>{formErrors.delivery}</p>
            )}
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
            value={formData.shortDescription || ''}
            onChange={handleChange}
            id='shortDescription'
            placeholder='Podaj opis'
            className='w-full p-2 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-600'
            rows='4'
          />
          {formErrors.shortDescription && (
            <p className='text-red-700 text-sm mt-1'>{formErrors.shortDescription}</p>
          )}
        </div>

        <div>
          <label className='block text-gray-600 mb-2 mt-5' htmlFor='description'>
            Opis szczegółowy
          </label>
          <SunEditor
            getSunEditorInstance={(editor) => {
              descriptionEditorRef.current = editor;
            }}
            value={formData.description || ''}
            onChange={handleDescriptionChange}
            setOptions={{
              buttonList: [
                ['undo', 'redo', 'bold', 'italic', 'underline', 'font', 'fontSize', 'formatBlock'],
                ['list', 'link', 'image'],
              ],
            }}
          />
          {formErrors.description && (
            <p className='text-red-700 text-sm mt-1'>{formErrors.description}</p>
          )}
        </div>

        <div>
          <label className='block text-gray-600 mb-2 mt-5' htmlFor='details'>
            Specyfikacja
          </label>
          <SunEditor
            getSunEditorInstance={(editor) => {
              detailsEditorRef.current = editor;
            }}
            value={formData.details || ''}
            onChange={handleDetailsChange}
            setOptions={{
              buttonList: [
                ['undo', 'redo', 'bold', 'italic', 'underline', 'font', 'fontSize', 'formatBlock'],
                ['list', 'link', 'image'],
              ],
            }}
          />
        </div>

        <div className='flex flex-col flex-1 '>
          <p className='block text-gray-600 mb-2 mt-5' htmlFor='details'>Zdjęcia</p>
          <p className='block text-gray-600 mb-2 text-sm'>Załaduj max. 3 obrazy. Pierwsze zdjęcie będzie główne.</p>

          <div className='flex gap-4'>
            <input
              onChange={(e)=>setFiles(e.target.files)}
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='p-3 border border-gray-300 rounded-xl bg-gray-100'
            />
            <button
              type='button'
              onClick={handleImageSubmit}
              disabled={uploading}
              className='p-3 bg-green-500 rounded-xl  text-white hover:bg-gray-800 disabled:opacity-80 transition-smooth'
            >{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
          <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
          {formErrors.imageUrls && (
            <p className='text-red-700 text-sm mt-1'>{formErrors.imageUrls}</p>
          )}
          <div className='grid grid-cols-3 gap-4 mb-6 mt-4'>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center rounded-xl'>
                <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                <button
                  type='button'
                  className='p-3 bg-red-600 text-white rounded-lg hover:bg-gray-800 transition-smooth'
                  onClick={() => handleRemoveImage(index)}
                >Usuń</button>
              </div>
            ))
          }
          </div>
          <div className='w-full text-center'>
            <button disabled={loading || uploading} className='p-3 bg-orange-600 text-white rounded-lg hover:bg-gray-800 transition-smooth dispabled:opacity-80'>
              {loading ? 'Aktualizowanie...' : '+ Zaktualizuj'}
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </div>

      </form>
    </div>
  )
}

export default EditProduct
