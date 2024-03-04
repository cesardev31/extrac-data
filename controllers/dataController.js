const express = require("express");
const router = express.Router();
const { analyzeData } = require("../models/dataModel");

// Ruta para mostrar la página principal
router.get("/", async (req, res) => {
  try {
    const data = await analyzeData();

    res.render("index", { data });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
