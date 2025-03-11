import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from "axios";

const UserSingleOrder = () => {
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
              <button
                className={`px-4 py-2 text-white font-semibold rounded flex items-center ${statusOptions[status]}`}
                disabled={loading}
              >
                {order.status}
              </button>
            </div>

            <div className="w-1/3">
              <p className="font-bold mb-2">Kod śledzenia przesyłki</p>
              <p>{order.trackingUrl || 'Brak kodu śledzenia.'}</p>
            </div>

            <div className="w-1/3">
              <p className="font-bold">Pobierz fakturę</p>
              <p>Brak faktury</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSingleOrder;
