"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = void 0;
const userModel_1 = require("../model/userModel");
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, userModel_1.deleteUserById)(id);
        return res.json({ message: "user has been deleted successfully!" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required!' });
        }
        const user = yield (0, userModel_1.getUserById)(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        user.name = name;
        yield user.save();
        res.status(200).json({ message: 'User updated successfully!', user: user });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map