import express  from "express"
import canboRouter from "./routes/api/canbo.js"
import sodoanRouter from "./routes/api/sodoansinhvien.js"
const router = express.Router()
router.get('/', function(req, res) {
    res.send('This is api page');
})

router.use('/canbo', canboRouter);
router.use('/sodoansinhvien', sodoanRouter);

export default router;