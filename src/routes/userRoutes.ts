import express, {Router} from 'express';

import { deleteUser, updateUser } from '../controller/userController';
import { isAuthenticated, isOwner } from '../middleware';


const router = Router();

router.delete('/deleteUser/:id', isAuthenticated, isOwner, deleteUser);
router.patch('/updateUser/:id', isAuthenticated, isOwner, updateUser);

export default router;