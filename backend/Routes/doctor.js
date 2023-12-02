import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor } from "../Controllers/doctorContoller.js";
import { authenticate, restrict } from "../Auth/verifyToken.js"; 

const router = express.Router();

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(['doctor']), updateDoctor);
router.delete("/:id", authenticate, restrict(['doctor']), deleteDoctor);

export default router;