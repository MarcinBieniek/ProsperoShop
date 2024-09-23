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
    reguired: false
  },
  orders: {
    type: Object,
    default: [],
    required: false
  },
  favourite: {
    type: Object,
    default: [],
    required: false
  },
  service: {
    type: Object,
    default: [],
    required: false
  },
  address: {
    type: 'String',
    required: false,
  },
  companyAddress: {
    type: 'String',
    required: false,
  },
  telephone: {
    type:'String',
    required: false,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
