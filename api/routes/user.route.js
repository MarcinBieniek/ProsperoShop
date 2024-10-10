import express from 'express';
import { deleteUser, updateUser, getUserListings, getAllUsers, deleteMyAccount, getUser, updateNewUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/all', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateNewUser);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);

// router.delete('/deleteaccount/:id', verifyToken, deleteMyAccount);

export default router;

