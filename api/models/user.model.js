import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/user-icon.png',
    required: false,
  },
  status: {
    type: String,
    default: 'user',
    required: false
  },
  telephone: {
    type: String,
    required: false,
  },
  // Adres korespondencyjny
  address: {
    type: Object,
    required: false,

    street: {
      type: String,
      required: false
    },
    streetNumber: {
      type: String,
      required: false
    },
    postalCode: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
  },
  // Dane firmy
  company: {
    type: Object,
    required: false,

    name: {
      type: String,
      required: false
    },
    street: {
      type: String,
      required: false
    },
    streetNumber: {
      type: String,
      required: false
    },
    postalCode: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    NIP: {
      type: String,
      required: false
    }
  },
  orders: {
    type: Array,
    required: false
  },
  favourite: {
    type: Array,
    required: false
  },
  service: {
    type: Array,
    required: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
