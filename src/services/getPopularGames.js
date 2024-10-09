export const getPopularGames = () => {
  
  // Mi API_KEY
  const API_KEY = "153236f9f6be477ebd30352e5ef827a5";

  // Fecha actual
  const fechaActual = new Date();

  const añoActual = fechaActual.getFullYear();
  const mesActual = String(fechaActual.getMonth() + 1).padStart(2, '0'); 
  const diaActual = String(fechaActual.getDate()).padStart(2, '0');

  // Fecha actual con formato "año-mes-dia"
  const fechaFormateadaActual = añoActual+"-"+mesActual+"-"+diaActual;

  // La fecha de un año antes de la actual
  const añoPasado = fechaActual.getFullYear() - 1;
  
  const fechaFormateadaUnAñoAntes = añoPasado+"-"+mesActual+"-"+diaActual;

  // Petición
  const url = 'https://api.rawg.io/api/games?key='+API_KEY+'&dates='+fechaFormateadaUnAñoAntes+','+fechaFormateadaActual+'&ordering=-rating&page_size=5';
  
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
  

};
