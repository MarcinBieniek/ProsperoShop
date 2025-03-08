// ten plik dotyczy danych finalnego zamówienia

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: Object,
      required: true,

      clientData: {
        type: Object,
        required: true,

        name: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        buildingNumber: {
          type: String,
          required: true,
        },
        apartmentNumber: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: false
        }
      },

      companyData: {
        type: Object,
        required: false,

        companyName: {
          type: String,
          required: true,
        },
        companyNamePerson: {
          type: String,
          required: false,
        },
        companyStreet: {
          type: String,
          required: true,
        },
        companyBuildingNumber: {
          type: String,
          required: true,
        },
        companyApartmentNumber: {
          type: String,
          required: true,
        },
        companyCity: {
          type: String,
          required: true,
        },
        companyPostalCode: {
          type: String,
          required: true,
        },
        companyPhoneNumber: {
          type: String,
          required: true,
        },
        nip: {
          type: String,
          required: true,
        }
      },

      deliveryAddress: {
        type: Object,
        required: true,

        name: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        buildingNumber: {
          type: String,
          required: true,
        },
        apartmentNumber: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: false
        }
      },

      remarks: {
        type: String,
        required: false,
      }
    },

    cartItems: [
      {
        _id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true
        },
        subcategory: {
          type: String,
          required: true
        },
        productCode: {
          type: String,
          required: false,
        },
        producer: {
          type: String,
          required: true,
        },
        price:{
          type: Number,
          required: true,
        },
        discountedPrice:{
          type: Number,
          required: false,
        },
        shortDescription:{
          type: String,
          required: false
        },
        description: {
          type: String,
          required: false,
        },
        details: {
          type: String,
          required: false,
        },
        imageUrls:{
          type: Array,
          required: true,
        },
        delivery:{
          type: String,
          required: true,
        },
        promotion:{
          type: Boolean,
          required: false,
        },
        sale:{
          type: Boolean,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
        cartQuantity: {
          type: Number,
          required: false,
        },
        createdAt: {
          type: String,
          required: true,
        }
      }
    ],

    deliveryMethod: {
      type: Object,
      required: true,

      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      time: {
        type: String,
        required: true
      }

    },

    paymentMethod: {
      type: Object,
      required: true,

      name: {
        type: String,
        required: true,
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    user: {
      type: Object,
      required: false,

      _id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true
      }
    },

    status: {
      type: String,
      required: true
    },

    trackingUrl: {
      type: String,
      required: true
    }

  }, {timestamps: true}
)

const Order = mongoose.model('Order', orderSchema);

export default Order;