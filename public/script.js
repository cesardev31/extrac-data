document.addEventListener("DOMContentLoaded", function () {
    const dataScript = document.getElementById("data-script");
    const data = JSON.parse(dataScript.getAttribute("data-data"));
  
    // Verificar si data está definida antes de acceder a ella
    console.log(data)
    if (typeof data !== "undefined") {
      createClientesPorDiaChart(data.clientesPorDia);
      createClientesPorMesChart(data.clientesPorMes);
    } else {
      console.error("Error: data is not defined");
    }
  });
  
  function createClientesPorDiaChart(clientesPorDiaData) {
    const labels = Object.keys(clientesPorDiaData);
    const data = labels.map((fecha) => clientesPorDiaData[fecha].total);
  
    var ctx = document.getElementById("clientesPorDia").getContext("2d");
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Clientes por día",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Eje Y", // Etiqueta del eje Y
              },
            },
          ],
        },
      },
    });
  }
  
  function createClientesPorMesChart(clientesPorMesData) {
    const labels = Object.keys(clientesPorMesData);
    const data = labels.map((mes) => clientesPorMesData[mes].total);
  
    var ctx = document.getElementById("clientesPorMes").getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Clientes por mes",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: "Eje Y", // Etiqueta del eje Y
              },
            },
          ],
        },
      },
    });
  }
  