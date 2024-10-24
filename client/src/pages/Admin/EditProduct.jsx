import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { usersFetch } from './../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {

  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  console.log('productData', productData);
  console.log('formData', formData);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/product/${id}`);
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

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Edytuj produkt</p>
      </div>
    </div>
  )
}

export default EditProduct
