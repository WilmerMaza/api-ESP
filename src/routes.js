const { Router } = require("express");
const { verificationToken } = require("./Utils/validateToken.js");


const ESPRouter = require("./Datos/Controllers/DatosController.js");

const router = Router();


router.use("/esp8266", ESPRouter);


router.use("*", (req, res) => {
  res.status(404).send({ error: "page not found" });
});

module.exports = router;
