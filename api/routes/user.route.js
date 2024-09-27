import express from 'express';
import { deleteUser, updateUser, getUserListings, getAllUsers, deleteMyAccount } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
// router.delete('/deleteaccount/:id', verifyToken, deleteMyAccount);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/all', getAllUsers);

export default router;

