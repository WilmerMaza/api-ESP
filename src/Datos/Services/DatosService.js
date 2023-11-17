const { Datos } = require("../../db.js");
const { v1 } = require("uuid");
const { EventEmitter } = require("events");
class DatosService {
  constructor() {
    // Inicializamos un EventEmitter para manejar eventos SSE
    this.eventEmitter = new EventEmitter();
  }
  async create(request) {
    try {
      const {
        body: { data },
      } = request;

      data.forEach((datosValue) => {
        datosValue.ID = v1();
      });

      // Utilizamos Sequelize para crear datos
      await Datos.bulkCreate(data);

      this.eventEmitter.emit("newData", await this.getAllDatos());
    } catch (error) {
      console.error("Error al crear el registro:", error);
      throw error;
    }
  }

  async getAllDatos() {
    try {
      return await Datos.findAll({
        order: [["createdAt", "DESC"]],
        limit: 2,
      });
    } catch (error) {
      console.error("Error al obtener Datos:", error);
      throw error;
    }
  }

  subscribeToSSE(callback) {
    this.eventEmitter.on("newData", callback);
  }

  // Método para configurar ganchos
  setupHooks() {
    Datos.addHook("afterCreate", async (datosInstance, options) => {
      // Emitir evento SSE después de crear un nuevo dato
      this.eventEmitter.emit("newData", await this.getAllDatos());
    });

    Datos.addHook("afterBulkCreate", async (datosInstances, options) => {
      // Emitir evento SSE después de crear datos en masa
      this.eventEmitter.emit("newData", await this.getAllDatos());
    });
  }
}

module.exports = new DatosService();
