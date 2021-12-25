import express from "express";
import { getAllSodoan, getSodoanByMsv, rutSo, nopso, add, update, deleted } from "../../controllers/sodoan.js";
const router = express.Router();

router.get('', getAllSodoan)
router.get('/:masodoan', getSodoanByMsv)
router.post('/create', add);
router.post('/update/:masodoan', update)
router.post('/rutso/:masodoan', rutSo)
router.post('/nopso/:masodoan', nopso)

export default router;