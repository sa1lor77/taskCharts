document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll("#data-table tbody tr");

  tableRows.forEach((row) => {
    row.addEventListener("click", function func() {
      const rowData = Array.from(row.children)
        .slice(1)
        .map((cell) => parseInt(cell.textContent));
      toggleChart(rowData, row);
    });
  });

  function toggleChart(data, row) {
    const chartContainer = row.nextElementSibling;

    if (
      !chartContainer ||
      chartContainer.tagName !== "DIV" ||
      !chartContainer.classList.contains("chart-none")
    ) {
      const newChartContainer = document.createElement("div");
      newChartContainer.classList.add("chart-none");
      row.parentNode.insertBefore(newChartContainer, row.nextSibling);
      generateChart(data, newChartContainer);
    } else {
      if (!chartContainer.classList.contains("chart-visible")) {
        chartContainer.classList.add("chart-visible");
      } else {
        chartContainer.classList.remove("chart-visible");
      }
    }
  }

  function generateChart(data, container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Текущий день", "Вчера", "Этот день недели"],
        datasets: [
          {
            label: "Данные",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
