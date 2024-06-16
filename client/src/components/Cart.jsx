import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaLongArrowAltLeft } from "react-icons/fa";

const Cart = () => {

  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h2>Koszyk</h2>
      {cart.cartItems.length === 0 ? (
        <div className='emptyCart'>
          <p>Twój koszyk jest pusty</p>
          <div className=''>
            <Link to="/" className='flex'>
              <FaLongArrowAltLeft />
              <span>Zapraszamy do zakupów</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='titles flex'>
            <h3>Produkt</h3>
            <h3>Cena</h3>
            <h3>Ilość</h3>
            <h3>Suma</h3>
          </div>
          <div className='items'>
            {cart.cartItems?.map(cartItem => (
              <div className='item' key={cartItem._id}>
                <div className='product'>
                  <img src={cartItem.imageUrls} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <h3>{cartItem.description}</h3>
                    <button>Remove</button>
                  </div>
                </div>
                <div className='price'>{cartItem.price} zł</div>
                <div className='quantity'>
                  <button>-</button>
                  <div className='count'>{cartItem.cartQuantity}</div>
                  <button>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className='summary'>
            <div className='clear'>Wyczyść koszyk</div>
            <div className='checkout'>
              <span>Cena całkowita:</span>
              <span className='amount'>{cart.cartTotalAmount} zł</span>
            </div>
            <p>Koszty wysyłki zostaną dodane w kolejnym kroku</p>
            <button>Zamów</button>
            <Link to="/" className='flex'>
              <FaLongArrowAltLeft />
              <span>Kontynuuj zakupy</span>
            </Link>
          </div>

        </div>
      )}
    </div>
  )
}

export default Cart
