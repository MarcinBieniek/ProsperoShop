import { useState, useEffect } from 'react';
import axios from "axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchOrders = async () => {

      setLoading(true)

      try {
        const response = await axios.get("http://localhost:3000/api/order/get", {
          withCredentials: true,
        });

        console.log('response', response);

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
        <p className='text-lg font-bold'>Zamówienia (2)</p>
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
          <div className='bg-white border-[1px] rounded-lg p-2'>
            Zamówienia
          </div>
        )}
      </div>

    </div>
  )
}

export default Orders
