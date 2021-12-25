import apiRoutes from "./api.js";
import bodyParser from "body-parser";
import express from "express";
const app = express()
const port = 3000
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Welcom homepage');
})

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})