import { useState, useEffect } from 'react';
import axios from "axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // pobieramy dane zamówień
  useEffect(() => {

    const fetchOrders = async () => {

      setLoading(true)

      try {
        const response = await axios.get("http://localhost:3000/api/order/get", {
          withCredentials: true,
        });

        console.log('response', response.data);

        setOrders(response.data);

      } catch (error) {
        console.log('Błąd pobierania zamówień:', error);
      }

      setLoading(false)
    };

    fetchOrders();

  }, []);

  return (
    <div className='bg-gray-100 rounded p-5'>

      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Zamówienia ({orders.length})</p>
        <div className='flex'>
          <div className="bg-white rounded-lg shadow-md w-46 mr-4">
            <input
              type="text"
              placeholder="Szukaj..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className='mt-5'>

        {loading ? (
          <div className='bg-white border-[1px] rounded-lg p-2'>
            Ładowanie zamówień...
          </div>
        ) : (
        <div className='bg-white border-[1px] rounded-lg p-4'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b-[1px] border-gray-300 uppercase text-sm'>
                <th className='py-5'>Data</th>
                <th className='py-5 px-2'>Użytkownik</th>
                <th className='py-5 px-2'>Ilość</th>
                <th className='py-5 px-2'>Cena</th>
                <th className='py-5 px-2'>Profit</th>
                <th className='py-5 px-2'>Status</th>
                <th className='py-5 px-2'>Aktualizacja</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className='border-b-[1px] border-bg-100 hover:bg-gray-100'>

                  <td className='py-5 px-2 text-center'>
                    {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                  </td>

                  <td className='py-5 px-2 text-center'>
                    {order.user.username}
                  </td>

                  <td className='py-5 px-2 text-center'>
                    {order.cartItems.length}
                  </td>

                  <td className='py-5 px-2 text-center'>
                    {order.totalPrice}
                  </td>

                  <td className='py-5 px-2 text-center'>
                    -
                  </td>

                  <td className='py-5 px-2 text-center'>
                    -
                  </td>

                  <td className='py-5 px-2 text-center'>
                    {new Date(order.updatedAt).toLocaleDateString("pl-PL")}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

    </div>
  )
}

export default Orders
