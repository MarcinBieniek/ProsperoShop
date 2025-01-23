import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { BiCartDownload } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { productFetch } from '../redux/products/productsSlice';
import { FaTruckLoading } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import DOMPurify from 'dompurify';

const Produkt = () => {

  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [mainImage, setMainImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('opis');

  useEffect(() => {
    dispatch(productFetch(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <div className='flex flex-col items-center justify-center h-screen'>
      <FaTruckLoading className='text-orange-600 text-6xl' />
      <p className='text-xl mt-5'>Ładowanie produktu...</p>
    </div>;
  }

  if (error) {
    return <div className='flex flex-col items-center justify-center h-screen'>
      <MdError className='text-orange-600 text-6xl' />
      <p className='text-xl mt-5'>Błąd {error}</p>
    </div>;
  }

  if (!selectedProduct) {
    return <div className='flex flex-col items-center justify-center h-screen'>
      <HiMiniQuestionMarkCircle className='text-orange-600 text-6xl' />
      <p className='text-xl mt-5'>Nie znaleziono produktu...</p>
    </div>;
  }

  const {
    name,
    category,
    subcategory,
    productCode,
    producer,
    price,
    shortDescription,
    description,
    details,
    imageUrls,
    delivery,
    promotion,
    sale,
    discountedPrice
   } = selectedProduct;

   const sanitizedDescription = DOMPurify.sanitize(description);
   const sanitizedDetails = DOMPurify.sanitize(details);

  return (
    <div className='container text-gray-800'>
      <div className='pt-5 pb-9 flex items-center text-gray-800'>
        <p>Strona główna</p>
        <MdKeyboardArrowRight className='px-1 text-3xl' />
        <p>Produkt</p>
      </div>

      <div className='flex'>
        <div className='slider w-2/6'>

          <div className="mb-4 flex item-center justify-center">
            <img src={imageUrls[mainImage]} alt="Główne zdjęcie" className="h-[300px]" />
          </div>

          <div className="flex justify-between">
            {imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniaturka ${index + 1}`}
                className={`w-1/3 mr-3 h-[120px] object-fit p-2 cursor-pointer transition-smooth ${mainImage === index ? 'border-[1px] border-b-2 border-b-orange-600 ' : 'border-[1px] border-gray-200'}`}
                onClick={() => setMainImage(index)}
              />
            ))}
          </div>
        </div>

        <div className='w-3/6 p-5 px-10'>
          <p className='text-sm text-gray-600 flex'>Producent: <p className='text-orange-600 ml-1'>{producer}</p></p>
          <p className='text-2xl pb-2 py-2'>{name}</p>
          { productCode && (
            <p className='text-sm text-gray-600 '>Kod producenta: {productCode}</p>
          )}
          <div className='text-gray-600 py-4 border-t-[1px] border-gray-200 mt-4'>
            <p>{shortDescription}</p>
          </div>
        </div>

        <div className='w-2/6 p-5 border-2 rounded-3xl'>
          <p className='pb-3 border-b-[1px] border-gray-200 text-gray-600'>Czas realizacji:<span className='text-green-500'> {delivery} dni robocze</span></p>
          <div className='py-4'>
            {discountedPrice ? (
              <>
                <p className='text-3xl'>{discountedPrice} zł</p>
                <p className='text text-gray-600 line-through'>{price} zł</p>
              </>
            ) : (
              <p className='text-3xl'>{price} zł</p>
            )
            }
          </div>
          <div>
            <p>Ilość:</p>
            <div className='border-[1px] rounded-full flex justify-between items-center px-4 py-2 mt-4 w-[50%]'>
              <p>1</p>
              <div className='flex'>
                <HiPlusSm className='bg-gray-200 cursor-pointer rounded-full text-xl mr-2' />
                <HiMinusSm className='bg-gray-200 cursor-pointer rounded-full text-xl' />
              </div>
            </div>
          </div>
          <div className='bg-gray-200 cursor-pointer flex justify-center my-5 p-3 rounded-3xl hover:bg-orange-600 hover:text-white transition-smooth' >
            <BiCartDownload className='text-2xl mr-2' />
            <p>Dodaj do koszyka</p>
          </div>
          <div className='bg-orange-600 text-white flex justify-center my-5 p-3 rounded-3xl hover:bg-gray-800 transition-smooth cursor-pointer'>Kup teraz</div>
          <div className='flex items-center text-gray-800 hover:text-orange-600 transition-smooth cursor-pointer'>
            <CiHeart className='text-xl mr-3' />
            <p>Dodaj do ulubionych</p>
          </div>
        </div>
      </div>

      <div className='py-5'>
        <div className='flex justify-center py-5'>
          <button
            className={`relative mx-4 px-4 py-2 ${selectedTab === 'opis' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-full`}
            onClick={() => setSelectedTab('opis')}
          >
            Opis produktu
            {selectedTab === 'opis' && (
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-orange-600"></span>
            )}
          </button>
          <button
            className={`relative mx-4 px-4 py-2 ${selectedTab === 'specyfikacja' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-full`}
            onClick={() => setSelectedTab('specyfikacja')}
          >
            Specyfikacja
            {selectedTab === 'specyfikacja' && (
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-orange-600"></span>
            )}
          </button>
        </div>

        <div className='p-5 border-2 rounded-3xl'>
          {selectedTab === 'opis' ? (
            <div>
              <h2 className='text-xl mb-4'>Opis Produktu</h2>
              <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            </div>
          ) : (
            <div>
              <h2 className='text-xl mb-4'>Specyfikacja</h2>
              <div dangerouslySetInnerHTML={{ __html: sanitizedDetails }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Produkt;