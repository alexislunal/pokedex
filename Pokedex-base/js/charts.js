const ctx = document.getElementById('stats');

export function createChart(pokemon) {
  const data = {
    labels: pokemon.stats.labels,
    datasets: [{
      label: pokemon.name,
      data: pokemon.stats.values,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };

  return new Chart(ctx, {
    type: 'radar',
    data: data,
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
              color: 'white',
              font: {
                size: 14
              }
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: 'rgba(255, 255, 255, 0.4)'
          },
          pointLabels: {
            color: 'white'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    }
  });
}
