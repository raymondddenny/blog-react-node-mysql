import express from "express";
import { register, signin, signout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/signout", signout);
router.post("/signin", signin);

export default router;
