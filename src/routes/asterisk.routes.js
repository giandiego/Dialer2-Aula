import { Router } from "express";
import * as Asterisk from "../controllers/asterisk.controller";
import auth from '../middleware/auth'   

const router = Router();

router.post("/call", auth, Asterisk.OriginateCall);

export default router;