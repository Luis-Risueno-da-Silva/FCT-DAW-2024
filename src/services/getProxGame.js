export const getProxGame = () => {
    // Mi API_KEY
    const API_KEY = "153236f9f6be477ebd30352e5ef827a5";
  
    // Fecha actual
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
    const diaActual = String(fechaActual.getDate()).padStart(2, '0');
  
    const fechaFormateadaActual = añoActual + "-" + mesActual + "-" + diaActual;
  
    // Fecha 3 meses después a la actual
    const fechaTresMesesDespues = new Date(fechaActual);
    fechaTresMesesDespues.setMonth(fechaActual.getMonth() + 3);
  
    const añoDespues = fechaTresMesesDespues.getFullYear();
    const mesDespues = String(fechaTresMesesDespues.getMonth() + 1).padStart(2, '0'); 
    const diaDespues = String(fechaTresMesesDespues.getDate()).padStart(2, '0');
  
    const fechaFormateadaMesesDespues = añoDespues + "-" + mesDespues + "-" + diaDespues;
  
    // URL de la consulta
    const url = 'https://api.rawg.io/api/games?key=' + API_KEY + '&dates=' + fechaFormateadaActual + ',' + fechaFormateadaMesesDespues + '&page_size=3';
  
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  };
  