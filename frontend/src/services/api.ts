import axios from 'axios';


const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

/* Función que consume el endpoint "/game_by_name/" para buscar juegos por nombre
* @param name: nombre del juego
* @param token: token del usuario
* @returns lista de juegos
TODO: El endpoint retorna muchos juegos, se pueden paginar?
*/
export const searchGamesByName = async (name: string, token: string) => {
  try {
    const response = await axios.get(urlServer + `/game_by_name/?name=${name}`, {
      headers: {
        'Authorization': `token ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    return [];
  }
}