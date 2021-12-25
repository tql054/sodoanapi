import express from "express";
import { getAllCanbo, getCanboById, update, updatePassword } from "../../controllers/canbo.js"; 
const router = express.Router();

router.get('', getAllCanbo)
router.get('/:id', getCanboById)
router.post('/update/:id', update)
router.post('/update_pass/:id', updatePassword)


export default router;