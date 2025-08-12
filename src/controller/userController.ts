import express, {Request, Response, NextFunction} from 'express';

import { deleteUserById, getUserById } from '../model/userModel';

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json({message: "user has been deleted successfully!"});
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        if(!name) {
            return res.status(400).json({ message: 'Name is required!' });
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        user.name = name;

        await user.save();

        res.status(200).json({ message: 'User updated successfully!', user: user  });

    } catch (error) {
        next(error);
    }
}

