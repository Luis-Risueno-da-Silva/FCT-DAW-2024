export const getOneGame = (slug) => {
  // Mi API_KEY
  const API_KEY = "153236f9f6be477ebd30352e5ef827a5";

  // Petición
  const url = "https://api.rawg.io/api/games/"+slug+"?key="+API_KEY

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
};
