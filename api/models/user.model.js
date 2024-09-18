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
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
