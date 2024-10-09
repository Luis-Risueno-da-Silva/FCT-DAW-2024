export const getGames = (page) => {
  // Mi API_KEY
  const API_KEY = "153236f9f6be477ebd30352e5ef827a5";

  // Petición
  const url = "https://api.rawg.io/api/games?&key="+API_KEY+"&page="+page//+"&ordering=-"+order

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};
