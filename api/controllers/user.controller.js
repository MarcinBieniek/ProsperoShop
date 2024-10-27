import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';

// Update user data - for user panel
export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))
  try {
    if(req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, {new: true})

    const {password, ...rest} = updateUser._doc

    res.status(200).json(rest);

  } catch (error) {
    next(error)
  }
}

// Update user data - for admin panel - name to change to updateUser
// Update z poziomu admina nie pozwala na zmianę hasła - tylko z poziomu usera
export const updateNewUser = async (req, res, next) => {
  console.log('req is', req.body);
  console.log('req id', req.params.id);

  try {
    // Budowanie obiektu aktualizacyjnego na podstawie przekazanych danych
    const updateFields = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      status: req.body.status,
      telephone: req.body.telephone,
      address: {
        street: req.body?.address?.street,
        streetNumber: req.body?.address?.streetNumber,
        postalCode: req.body?.address?.postalCode,
        city: req.body?.address?.city
      },
      company: {
        name: req.body?.company?.name,
        street: req.body?.company?.street,
        streetNumber: req.body?.company?.streetNumber,
        postalCode: req.body?.company?.postalCode,
        city: req.body?.company?.city,
        nip: req.body?.company?.nip
      },
      orders: req.body.orders,
      favourite: req.body.favourite,
      service: req.body.service
    };

    // Tylko wtedy, gdy hasło jest przekazane, aktualizuj je
    if (req.body.password) {
      updateFields.password = req.body.password;
    }

    // Aktualizuj użytkownika w bazie
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    // Usuń hasło z odpowiedzi, aby nie było widoczne w JSON
    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// delete user - for user panel
export const deleteMyAccount = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!')
  } catch (error) {
    next(error)
  }
}

// delete user - for admin panel
export const deleteUser = async (req, res, next) => {

  try {
    await User.findByIdAndDelete(req.params.id);
    // succes dla usera wyzej?
    res.status(200).json({ success: true, message: 'User has been deleted!' });
  } catch (error) {
    next(error)
  }
}

// Get user listings
export const getUserListings = async (req, res, next) => {
  if(req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error)
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listing'));
  }
}

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }); // znajdź wszystkich użytkowników i nie pokazuj pola hasło
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// Get single user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 }); // Znajdź użytkownika i wyklucz pole hasło
    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

