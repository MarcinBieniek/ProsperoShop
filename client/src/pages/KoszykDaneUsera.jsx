import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { PiEmptyLight } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { FaAddressCard } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { updateAddress, addUser } from "../redux/order/orderSlice";

const deliveryOptions = [
  { id: 1, name: "Kurier DHL", time: "1-2 dni", price: 15, icon: '/logo/kurier-dhl.png' },
  { id: 2, name: "Kurier DPD", time: "2-3 dni", price: 12, icon: '/logo/kurier-dpd.png' },
  { id: 3, name: "Odbiór osobisty", time: "1-2 dni", price: 0 }
];

const paymentOptions = [
  { id: 1, name: "Przelewy 24", icon: '/logo/przelewy-24.png' },
  { id: 2, name: "Przelew tradycyjny" }
];

const KoszykDaneUsera = () => {

  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const users = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log('order is', order)

  const [selectedCourier, setSelectedCourier] = useState(deliveryOptions[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const [isInvoiceRequired, setIsInvoiceRequired] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [clientData, setClientData] = useState({
    name: "",
    street: "",
    buildingNumber: "",
    apartmentNumber: "",
    country: "Polska",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [companyData, setCompanyData] = useState({
    companyName: "",
    nip: "",
    companyStreet: "",
    companyBuildingNumber: "",
    companyApartmentNumber: "",
    companyCity: "",
    companyPostalCode: "",
    companyPhoneNumber: "",
    companyNamePerson: "",
  });

  const handleNextStep = () => {
    const addressData = {
      clientData,
      companyData: isInvoiceRequired ? companyData : null,
      deliveryAddress: clientData,
      remarks
    };

    const user = users.currentUser;

    dispatch(updateAddress(addressData));
    dispatch(addUser(user))

    console.log("Przechodzimy do finalizacji:", order);
  };

  const handleClientDataChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompanyDataChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  return (
    <div className="container">
      <h2 className='font-medium text-3xl text-center py-6 pb-10'>Twój koszyk</h2>

      {cart.cartItems.length === 0 ? (
        <div className='emptyCart flex flex-col items-center justify-center h-[400px]'>
          <PiEmptyLight className='text-orange-600 text-6xl mb-20' />
          <p className="text-xl mb-5">Twój koszyk jest pusty</p>
          <div className=''>
            <Link to="/sklep" className='flex items-center hover:text-orange-600 transition-all duration-300 transform hover:-translate-x-1'>
              <FaLongArrowAltLeft />
              <span className="ml-2 text-xl">Zapraszamy do zakupów</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-center mt-2 mb-16'>
            <div className='bg-orange-600 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <SlBasket className='text-orange-600 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Podsumowanie</p>
            </div>
            <div className='h-[5px] w-[40px] bg-orange-600 rounded-lg self-center mx-5'></div>
            <div className='bg-orange-600 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <FaAddressCard className='text-orange-600 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Dane</p>
            </div>
            <div className='h-[5px] w-[40px] bg-gray-300 rounded-lg self-center mx-5'></div>
            <div className='bg-gray-300 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <IoIosSend className='text-gray-300 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Finalizacja</p>
            </div>
          </div>

          <div className='flex gap-10'>
            <div className='w-2/3'>
              <div className='flex'>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Dane adresowe</p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
                  <input
                    type="text"
                    name="name"
                    value={clientData.name}
                    onChange={handleClientDataChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ulica</label>
                  <input
                    type="text"
                    name="street"
                    value={clientData.street}
                    onChange={handleClientDataChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Nr budynku</label>
                    <input
                      type="text"
                      name="buildingNumber"
                      value={clientData.buildingNumber}
                      onChange={handleClientDataChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Nr mieszkania</label>
                    <input
                      type="text"
                      name="apartmentNumber"
                      value={clientData.apartmentNumber}
                      onChange={handleClientDataChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Kraj</label>
                  <input
                    type="text"
                    name="country"
                    value={clientData.country}
                    readOnly
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Miejscowość</label>
                    <input
                      type="text"
                      name="city"
                      value={clientData.city}
                      onChange={handleClientDataChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">Kod pocztowy</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={clientData.postalCode}
                      onChange={handleClientDataChange}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Numer telefonu</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={clientData.phoneNumber}
                    onChange={handleClientDataChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isInvoiceRequired}
                      onChange={() => setIsInvoiceRequired(!isInvoiceRequired)}
                      className="mr-2"
                    />
                    <span>Chcę fakturę VAT</span>
                  </label>
                </div>

                {isInvoiceRequired && (
                  <div className='space-y-4'>
                    <div className='flex '>
                      <div className='bg-sky-400 rounded-lg p-2 flex justify-center mr-2'>
                        <p className='text-white'>Dane do faktury</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Nazwa firmy</label>
                        <input
                          type="text"
                          name="companyName"
                          value={companyData.companyName}
                          onChange={handleCompanyDataChange}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Nr NIP</label>
                        <input
                          type="text"
                          name="nip"
                          value={companyData.nip}
                          onChange={handleCompanyDataChange}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
                      <input
                        type="text"
                        name="companyNamePerson"
                        value={companyData.companyNamePerson}
                        onChange={handleCompanyDataChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ulica</label>
                      <input
                        type="text"
                        name="companyStreet"
                        value={companyData.companyStreet}
                        onChange={handleCompanyDataChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Nr budynku</label>
                        <input
                          type="text"
                          name="companyBuildingNumber"
                          value={companyData.companyBuildingNumber}
                          onChange={handleCompanyDataChange}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Nr mieszkania</label>
                        <input
                          type="text"
                          name="companyApartmentNumber"
                          value={companyData.companyApartmentNumber}
                          onChange={handleCompanyDataChange}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Kraj</label>
                      <input
                        type="text"
                        name="companyCountry"
                        value="Polska"
                        readOnly
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Miejscowość</label>
                        <input
                          type="text"
                          name="companyCity"
                          value={companyData.companyCity}
                          onChange={handleCompanyDataChange}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Kod pocztowy</label>
                        <input
                          type="text"
                          name="companyPostalCode"
                          value={companyData.companyPostalCode}
                          onChange={handleCompanyDataChange}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Numer telefonu</label>
                      <input
                        type="tel"
                        name="companyPhoneNumber"
                        value={companyData.companyPhoneNumber}
                        onChange={handleCompanyDataChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Uwagi</label>
                  <textarea
                    value={remarks}
                    onChange={handleRemarksChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Dodaj uwagi do zamówienia"
                  />
                </div>
              </form>
            </div>

            <div className='w-1/3 relative'>
              <div className='sticky top-5'>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-7'>
                  <p className='text-white'>Podsumowanie zamówienia</p>
                </div>

                <div className='mb-2'>
                  <p>Wybrane produkty:</p>
                  {order.cartItems.map((item) => (
                    <div className='flex'>
                      <p className='mr-2'>{item.name}</p>
                      <p>{item.cartQuantity} szt</p>
                    </div>
                  ))}
                </div>

                <div className='flex mb-2 w-[50%] justify-between'>
                  <p className='mr-2'>Suma całkowita: </p>
                  <p>{cart.cartTotalAmount} zł</p>
                </div>

                <div className='mb-2'>
                  <div className='flex w-[50%] justify-between mb-2'>
                    <p className='mr-2'>Koszt dostawy: </p>
                    <p>{selectedCourier.price} zł</p>
                  </div>
                  <div className='flex items-center mb-2'>
                    <p>Dostawa:</p>
                    <p className='ml-2'>{selectedCourier.name}</p>
                  </div>
                  <div className='flex items-center'>
                    <p>Sposób płatności:</p>
                    <p className='ml-2'>{selectedPayment.name}</p>
                  </div>
                </div>

                <div className='flex mb-5'>
                  <p className='mr-2 text-2xl'>Do zapłaty: </p>
                  <p className='text-2xl'>{order.totalPrice} zł</p>
                </div>

                <Link to="/koszyk/podsumowanie">
                  <button
                    className="py-2 my-2 bg-orange-600 w-full rounded-lg text-white hover:bg-gray-800 transition-smooth"
                    onClick={handleNextStep}
                  >
                    Przejdź do podsumowania
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KoszykDaneUsera;
