const { Router } = require("express");
const router = Router();
const data = require("../Services/DatosService.js");
const { verificationToken } = require("../../Utils/validateToken.js");

router.get("/getAll",  async (req, res) => {
  try {
    const Categoria = await data.getAllDatos();
    res.json(Categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los registros" });
  }
});

router.post("/create", async (req, res) => {
  try {
    await data.create(req);
    const response = {
      Menssage: "Datos insertados con éxito",
    };
    res.status(200).send(response);
  } catch (error) {
    console.error("Error al crear el registro:", error);
    res
      .status(500)
      .json({ error: "Error al crear el registro", mjs: error.message });
  }
});

// SSE Endpoint para notificaciones en tiempo real
// SSE Endpoint para notificaciones en tiempo real
router.get("/notificaciones-sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Manejar la desconexión del cliente
  req.on("close", () => {
    console.log("Cliente SSE desconectado");
    res.end();
  });

  // Establecer la conexión SSE
  const sendSSE = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Suscribirse a eventos SSE
  const onNewData = (datos) => {
    sendSSE(datos);
  };

  // Iniciar el envío de datos y suscribirse a cambios
  data.subscribeToSSE(onNewData);

  // Manejar errores
  req.on("error", (err) => {
    console.error("Error en la conexión SSE:", err);
  });
});


module.exports = router;
