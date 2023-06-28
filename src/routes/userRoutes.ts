import express, {Router} from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controller/userController';
import { isAdmin, isAuthenticated, isOwner } from '../middleware';


const router = Router();

router.get('/getAllUsers', isAuthenticated, isAdmin, getAllUsers);
router.delete('/deleteUser/:id', isAuthenticated, isOwner, deleteUser);
router.patch('/updateUser/:id', isAuthenticated, isOwner, updateUser);

export default router;