import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router=Router();


router.route("/api/v1/register").post(registerUser);
//https://localhost:8000/api/v1/users/register


export default router;