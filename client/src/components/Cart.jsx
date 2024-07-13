import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { addToCart, clearCart, decreaseCart, removeFromCart } from "../redux/cart/cartSlice";

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem))
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem))
  };

  const handleClearCart = () => {
    dispatch(clearCart())
  };

  return (
    <div>
      <h2 className='font-medium text-3xl text-center py-6'>Koszyk</h2>
      {cart.cartItems.length === 0 ? (
        <div className='emptyCart flex flex-col items-center'>
          <p className="">Twój koszyk jest pusty</p>
          <div className=''>
            <Link to="/" className='flex items-center'>
              <FaLongArrowAltLeft />
              <span className="ml-2">Zapraszamy do zakupów</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='text-sm uppercase grid grid-cols-6 gap-4 pb-4'>
            <h3 className="col-span-3">Produkt</h3>
            <h3 className="col-span-1">Cena</h3>
            <h3 className="col-span-1">Ilość</h3>
            <h3 className="col-span-1 flex justify-end">Suma</h3>
          </div>
          <div className='items'>
            {cart.cartItems?.map(cartItem => (
              <div className='text-sm grid grid-cols-6 gap-4 items-center border-t-[2px] border-gray-300 py-5' key={cartItem._id}>

                <div className="col-span-3 flex">
                  <img className="w-[100px] h-[100px] mr-4" src={cartItem.imageUrls} alt={cartItem.name} />
                  <div>
                    <h3 className="uppercase text-lg">{cartItem.name}</h3>
                    <h3 className="py-2">{cartItem.description}</h3>
                    <button
                      className="bg-gray-300 p-2 rounded pointer hover:bg-gray-200"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    >Remove</button>
                  </div>
                </div>

                <div className="col-span-1">{cartItem.regularPrice} zł</div>
                <div className="col-span-1 flex items-center justify-center w-[138px] max-w-full border-2 border-gray-400 rounded py-2">
                  <button onClick = {() => handleDecreaseCart(cartItem)}>
                  -
                  </button>
                  <div className='count'>{cartItem.cartQuantity}</div>
                  <button onClick={()  => handleIncreaseCart(cartItem)}>
                  +
                  </button>
                </div>
                <div className="col-span-1 flex justify-end font-bold">{cartItem.regularPrice} zł</div>
              </div>
            ))}
          </div>

          <div className='summary flex justify-between items-start border-t-[2px] border-gray-300 py-5'>
            <button
              className='w-[130px] max-w-full h-[40px] rounded bg-gray-300 hover:bg-gray-200 pointer'
              onClick={() => handleClearCart()}
            >
              Wyczyść koszyk
            </button>
            <div className='checkout w-[270px] max-w-full'>
              <div className="flex justify-between">
                <span>Cena całkowita:</span>
                <span className='amount font-bold'> {cart.cartTotalAmount}  zł</span>
              </div>
              <p>Koszty wysyłki zostaną dodane w kolejnym kroku</p>
              <button className="py-2 my-2 bg-blue-500 w-full rounded text-white hover:bg-blue-400">Zamów</button>
              <Link to="/" className='flex items-center'>
                <FaLongArrowAltLeft className="mr-2"/>
                <span>Kontynuuj zakupy</span>
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart
