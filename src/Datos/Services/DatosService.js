const { Datos } = require("../../db.js");
const { v1 } = require("uuid");

class DatosService {
  async create(request) {
    try {
      const {
        body: { data },
      } = request;

      data.forEach(async (datosValue) => {
        datosValue.ID = v1();
        const bodyRequest = datosValue;
        await Datos.create(bodyRequest);
      });
    } catch (error) {
      console.error("Error al crear el registro:", error);
      throw error;
    }
  }

  async getAllDatos() {
    try {
      return await Datos.findAll();
    } catch (error) {
      console.error("Error al obtener Datos:", error);
      throw error;
    }
  }

  async updateCategoria(dataUpdate) {
    const {
      body,
      user: {
        dataUser: { ID },
      },
    } = dataUpdate;

    try {
      const rowsUpdated = await Categoria.update(body, {
        where: { name: body.name, SportsInstitutionID: ID },
        returning: true,
      });

      if (rowsUpdated[0] === 0) {
        // No se actualizó ningún registro
        return null;
      }

      return "Categoria actualizado con éxito";
    } catch (error) {
      console.error("Error al actualizar el Categoria:", error);
      throw error;
    }
  }

  async getCategoria(name) {
    return await Categoria.findOne({
      where: { name: name },
    });
  }

  async getAllCategoriaByCoach(request) {
    try {
      const {
        user: {
          dataUser: { SportsInstitutionID },
        },
      } = request;

      return await Categoria.findAll({
        where: { SportsInstitutionID },
      });
    } catch (error) {
      console.error("Error al obtener las Categorias:", error);
      throw error;
    }
  }
}

module.exports = new DatosService();
