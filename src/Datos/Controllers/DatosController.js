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

// router.put("/update", verificationToken, async (req, res) => {
//   try {
//     const Categoria = await CategoriaService.updateCategoria(req);
//     if (Categoria) {
//       const response = {
//         Menssage: "Registro Actualizado Exitosamente",
//       };
//       res.status(200).send(response);
//     } else {
//       res.status(404).json({ error: "El registro no fue encontrado" });
//     }
//   } catch (error) {
//     console.error("Error al actualizar el registro:", error);
//     res
//       .status(500)
//       .json({ error: "Error al actualizar el registro", mjs: error.message });
//   }
// });


// router.post("/getAllByCoach", verificationToken, async (req, res) => {
//   try {
//     const Categoria = await CategoriaService.getAllCategoriaByCoach(req);
//     res.json(Categoria);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener los registros" });
//   }
// });

module.exports = router;
