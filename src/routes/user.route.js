import { Router } from "express";
import userController from "../controllers/user";
import Validation  from '../validation/user';
import verifyToken from "../middlewares/verify-token";
import upload from "../middlewares/photo-upload";


const { registerUsers, login, fetchAllUsers, fetchUser, updateProfile, deleteUserAccount } = userController;
const { validateSignupDetails, validatePassword, validateLoginDetails } = Validation;

const router = new Router();

router.post("/register", validateSignupDetails, registerUsers);
router.post("/login", validatePassword, validateLoginDetails, login);
router.get("/users", verifyToken, fetchAllUsers);
router.get("/users/:id", verifyToken, fetchUser);
router.patch("/users/:id", upload.single("photo"), verifyToken, updateProfile);
router.delete("/users/:id", verifyToken, deleteUserAccount);

export default router;
