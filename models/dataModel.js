// models/dataModel.js

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function analyzeData() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const collection = client.db("sheets-idealidad").collection("sheets");
    const clientes = await collection.find({}).toArray();

    // Analizar los datos para determinar en qué fechas llegan más clientes y de dónde provienen
    const fechasClientes = clientes.map((cliente) => ({
      fecha: new Date(cliente.fechaHora),
      fuente: cliente.pt,
    }));

    // Agrupar los datos por día
    const clientesPorDia = {};
    fechasClientes.forEach((cliente) => {
      const fechaDia = cliente.fecha.toISOString().split("T")[0]; // Extraer solo la parte de la fecha (YYYY-MM-DD)
      if (!clientesPorDia[fechaDia]) {
        clientesPorDia[fechaDia] = { total: 0, fb: 0, ig: 0 };
      }
      clientesPorDia[fechaDia].total++;
      clientesPorDia[fechaDia][cliente.fuente]++;
    });

    // Agrupar los datos por mes
    const clientesPorMes = {};
    fechasClientes.forEach((cliente) => {
      const fechaMes = cliente.fecha.toISOString().slice(0, 7); // Extraer solo el año y el mes (YYYY-MM)
      if (!clientesPorMes[fechaMes]) {
        clientesPorMes[fechaMes] = { total: 0, fb: 0, ig: 0 };
      }
      clientesPorMes[fechaMes].total++;
      clientesPorMes[fechaMes][cliente.fuente]++;
    });

    return { clientesPorDia, clientesPorMes };
  } finally {
    await client.close();
  }
}

module.exports = { analyzeData };
