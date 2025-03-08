import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from "axios";

const SingleOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingUrl, setTrackingUrl] = useState("");
  const [savingTracking, setSavingTracking] = useState(false);

  console.log('order is', order)

  const statusOptions = {
    "Nieopłacony": "bg-red-500",
    "Opłacony": "bg-orange-500",
    "Realizacja": "bg-orange-500",
    "Wysłany": "bg-green-500",
    "Zakończony": "bg-gray-300",
    "Anulowany": "bg-red-500",
  };

  // Pobiera dane zamówienia po załadowaniu strony
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/order/${id}`);
        setOrder(response.data);
        setStatus(response.data.status);
        setTrackingUrl(response.data.trackingUrl || "");
      } catch (error) {
        console.error("Błąd podczas pobierania zamówienia:", error);
      }
    };

    fetchOrder();
  }, [id]);

  // Aktualizuje status zamówienia
  const updateOrderStatus = async (newStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:3000/api/order/update-status",
        { id, newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setStatus(newStatus);
        setOrder((prev) => ({ ...prev, status: newStatus }));
      } else {
        console.error("Błąd aktualizacji statusu", response.data);
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  // Aktualizuje www kuriera
  const saveTrackingUrl = async () => {
    try {
      setSavingTracking(true);
      await axios.put(
        "http://localhost:3000/api/order/update-tracking",
        { id, trackingUrl },
        { headers: { "Content-Type": "application/json" } }
      );

      setOrder((prev) => ({ ...prev, trackingUrl }));
      console.log("Adres śledzenia zapisany");
    } catch (error) {
      console.error("Błąd zapisu linku do śledzenia:", error);
    } finally {
      setSavingTracking(false);
    }
  };

  if (!order) return <p>Ładowanie...</p>;

  return (
    <div className="bg-gray-100 rounded p-5">
      <div className="flex justify-between items-center border-b-[1px] pb-5">
        <p className="text-lg font-bold">Zamówienie #{order._id.slice(-6)}</p>
        <p className="text-lg font-bold">{order.user.username}</p>
      </div>

      <div className="mt-5">
        <div className="bg-white border-[1px] rounded-lg p-4">
          <div className="flex justify-between border-b-[1px] border-gray-300 mb-5 pb-5">
            <div>
              <p className="font-bold mb-2">Adres dostawy</p>
              <p>{order.address.clientData.name}</p>
              <p>
                {order.address.clientData.street} {order.address.clientData.buildingNumber}
                {order.address.clientData.apartmentNumber && `/${order.address.clientData.apartmentNumber}`}
              </p>
              <p>{order.address.clientData.postalCode} {order.address.clientData.city}</p>
              <p>Tel: {order.address.clientData.phoneNumber}</p>
            </div>

            <div>
              <p className="font-bold mb-2">Dostawa</p>
              <div className="flex items-center">
                <img src={order.deliveryMethod.icon} className="h-10 w-10 mr-2 rounded" />
                <p>{order.deliveryMethod.name}</p>
              </div>
              <p>Cena: {order.deliveryMethod.price} zł</p>
              <p>Czas realizacji: {order.deliveryMethod.time}</p>
            </div>

            <div>
              <p className="font-bold mb-2">Płatność</p>
              <img src={order.paymentMethod.icon} className="h-10 mr-2 object-cover" />
              <p>{order.paymentMethod.name}</p>
            </div>
          </div>

          <div className="flex border-b-[1px] pb-5">
            <div className="w-2/3">
              <p className="font-bold mb-3">Elementy zamówienia</p>
              {order.cartItems.length > 0 ? (
                <ul className="space-y-4">
                  {order.cartItems.map((item, index) => (
                    <li key={index} className="flex items-center bg-gray-100 p-4 mr-4 mb-2">
                      <img src={item.imageUrls} alt={item.name} className="h-20 w-20 object-cover rounded mr-4" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p>Ilość: {item.cartQuantity}</p>
                        <p>Cena: {item.price} zł</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Brak produktów w koszyku.</p>
              )}
            </div>

            <div className="w-1/3">
              <p className="mb-2 font-bold">Szczegóły</p>
              <p>Data złożenia zamówienia: {new Date(order.createdAt).toLocaleDateString("pl-PL")}</p>
              <p>Cena brutto: {order.totalPrice}</p>
            </div>
          </div>

          <div className="pt-3 flex">
            <div className="w-1/3">
              <p className="font-bold mb-2">Status</p>
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`px-4 py-2 text-white font-semibold rounded flex items-center ${statusOptions[status]}`}
                  disabled={loading}
                >
                  {loading ? "Aktualizowanie..." : status} <MdKeyboardArrowDown className="ml-2" />
                </button>
                {isOpen && (
                  <div className="absolute z-10 w-48 bg-white border shadow-md">
                    {Object.keys(statusOptions).map((option) => (
                      <button
                        key={option}
                        onClick={() => updateOrderStatus(option)}
                        className={`block w-full px-4 py-2 text-left hover:bg-gray-200 ${statusOptions[option]} text-white`}
                        disabled={loading}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/3">
              <p className="font-bold mb-2">Kod śledzenia przesyłki</p>
              <div className="flex">
                <input
                  type="text"
                  className="border px-3 py-2 rounded-tr-none rounded-tl-md rounded-br-none rounded-bl-md w-full focus:outline-none"
                  placeholder="Wklej adres śledzenia"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                />
                <button
                  onClick={saveTrackingUrl}
                  className=" bg-blue-500 text-white px-4 py-2 rounded-tl-none rounded-br-md rounded-bl-none rounded-tr-md"
                  disabled={savingTracking}
                >
                  {savingTracking ? "Zapisywanie..." : "Zapisz"}
                </button>
              </div>
              <div>
                <Link to={order.trackingUrl} className='py-2 flex'>
                  <p>Url:</p>
                  <p className='text-blue-500 ml-2'>{order.trackingUrl}</p>
                </Link>
              </div>
            </div>

            <div className="w-1/3">
              <p className="font-bold">Dodaj fakturę</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
