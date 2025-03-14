import { SlBasket } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, getTotals } from "../redux/cart/cartSlice";
import { slugify } from '../utils/slugify';
import { IoHeartOutline } from "react-icons/io5";

const ShopProductCard= ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = () => {
    const formattedCategory = slugify(product.category);
    const formattedSubcategory = slugify(product.subcategory);
    const formattedProductName = slugify(product.name);

    const productUrl = `/sklep/${formattedCategory}/${formattedSubcategory}/${formattedProductName}/${product._id}`;

    navigate(productUrl);
  };

  const handleBasketClick = (e) => {
    e.stopPropagation();

    const productWithQuantity = {
      ...product,
      quantity: 1,
    };

    dispatch(addToCart(productWithQuantity));
    dispatch(getTotals());
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    console.log("Dodaj do ulubionych:", product);

    // Tutaj dodamy dispatch do reduxa w następnym kroku
  };

  return (
    <div className='basket-container border border-gray-200 rounded-lg p-2 box-shadow cursor-pointer' onClick={handleProductClick}>
      <p className='text-sm pb-2'>{product.producer}</p>
      <div className='font-bold text-sky-400 hover:text-yellow-300 transition-smooth'>
        <p className='pb-3'>{product.name}</p>
      </div>
      <div className='relative'>
        <img
          className='object-cover w-full rounded h-[200px]'
          src={product.imageUrls}
          alt={product.name}
        />
        <div
          className='absolute top-1 right-1 p-2 cursor-pointer hover:text-red-500 transition'
          onClick={handleHeartClick}
        >
          <IoHeartOutline className='text-xl' />
        </div>
      </div>
      <div className='pt-3 flex items-center justify-between'>
        {product.discountedPrice ? (
          <div className='flex items-center'>
            <p className='text-red-600 text-2xl mr-5'>{product.discountedPrice} zł</p>
            <p className='text-sm line-through'>{product.price} zł</p>
          </div>
        ) : (
          <div className='flex items-center'>
            <p className='text-2xl mr-5'>{product.price} zł</p>
          </div>
        )}
        <div
          className='basket-icon cursor-pointer transition-smooth text-sm bg-gray-200 rounded-full w-10 h-10 text-white flex items-center justify-center'
          onClick={handleBasketClick}
        >
          <SlBasket className='text-2xl' />
        </div>
      </div>
      <p className='text-sm py-2'>{product.shortDescription}</p>
    </div>
  );
};

export default ShopProductCard;
